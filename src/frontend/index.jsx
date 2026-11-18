import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
  DynamicTable,
  Heading,
  Spinner,
  Stack,
  Text,
  Lozenge,
} from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    invoke('getProjectIssues')
      .then(setIssues)
      .catch((err) => {
        console.error(err);
        setError(`Error: ${err.message || JSON.stringify(err)}`);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner size="large" />;
  }

  const head = {
    cells: [
      { key: 'key', content: 'Issue Key', isSortable: true },
      { key: 'summary', content: 'Summary' },
      { key: 'status', content: 'Status' },
      { key: 'risk', content: 'Risk Level' },
      { key: 'reason', content: 'Risk Reason' },
    ],
  };

  const getRiskAppearance = (level) => {
    if (level === 'Critical') return 'removed'; // Red
    if (level === 'High') return 'moved'; // Orange/Red
    if (level === 'Medium') return 'inprogress'; // Yellow
    return 'success'; // Green
  };

  const rows = issues.map((issue) => ({
    key: issue.key,
    cells: [
      { key: 'key', content: issue.key },
      { key: 'summary', content: issue.summary },
      { key: 'status', content: issue.status },
      { 
        key: 'risk', 
        content: <Lozenge appearance={getRiskAppearance(issue.riskLevel)}>{issue.riskLevel}</Lozenge> 
      },
      { key: 'reason', content: issue.riskReason },
    ],
  }));

  return (
    <Stack space="space.200">
      <Heading size="medium">Jira Risk Analytics Dashboard</Heading>
      <Text>Live baseline data from project KAN</Text>
      {error ? <Text>{error}</Text> : <DynamicTable head={head} rows={rows} />}
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
