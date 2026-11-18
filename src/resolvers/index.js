import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// 1. UI DASHBOARD RESOLVER
resolver.define('getProjectIssues', async () => {
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/search/jql?jql=project=KAN&maxResults=50&fields=key,summary,status,priority,issuetype`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Jira API Error:', response.status, errorText);
    throw new Error(`Jira API responded with ${response.status}`);
  }

  const data = await response.json();

  return data.issues.map((issue) => {
    const status = issue.fields.status.name;
    const priority = issue.fields.priority?.name || 'Medium';
    const issueType = issue.fields.issuetype.name;

    let riskLevel = 'Low';
    let riskReason = 'Normal workflow';

    if (status === 'Done') {
      riskLevel = 'Low';
      riskReason = 'Issue completed';
    } else if (issueType === 'Bug' && status === 'To Do') {
      riskLevel = 'High';
      riskReason = 'Unstarted bug may delay sprint';
    } else if (issueType === 'Bug' && priority === 'High') {
      riskLevel = 'Critical';
      riskReason = 'High priority bug requires immediate attention';
    } else if (status === 'In Progress') {
      riskLevel = 'Medium';
      riskReason = 'Active work, monitor for blockers';
    }

    return {
      key: issue.key,
      summary: issue.fields.summary,
      status: status,
      priority: priority,
      issueType: issueType,
      riskLevel: riskLevel,
      riskReason: riskReason,
    };
  });
});

// 2. ROVO AGENT HANDLER (Only defined ONCE here)
export const getSprintRisksHandler = async () => {
  const response = await api
    .asApp()
    .requestJira(route`/rest/api/3/search/jql?jql=project=KAN&maxResults=50&fields=key,summary,status,priority,issuetype`);

  if (!response.ok) {
    return "Failed to fetch Jira issues.";
  }

  const data = await response.json();

  let report = "Current Sprint Risks:\n";
  
  data.issues.forEach((issue) => {
    const status = issue.fields.status.name;
    const priority = issue.fields.priority?.name || 'Medium';
    const issueType = issue.fields.issuetype.name;
    
    let riskLevel = 'Low';
    let riskReason = 'Normal workflow';

    if (status === 'Done') {
      riskLevel = 'Low';
      riskReason = 'Issue completed';
    } else if (issueType === 'Bug' && status === 'To Do') {
      riskLevel = 'High';
      riskReason = 'Unstarted bug may delay sprint';
    } else if (issueType === 'Bug' && priority === 'High') {
      riskLevel = 'Critical';
      riskReason = 'High priority bug requires immediate attention';
    } else if (status === 'In Progress') {
      riskLevel = 'Medium';
      riskReason = 'Active work, monitor for blockers';
    }

    report += `- ${issue.key} (${issueType}, ${status}): ${riskLevel} Risk. Reason: ${riskReason}. Summary: ${issue.fields.summary}\n`;
  });

  return report;
};

// 3. EXPORT RESOLVERS
export const handler = resolver.getDefinitions();