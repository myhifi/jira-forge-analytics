# Sprint Risk Copilot 🚀

**Codegeist 2026 Submission - Apps for Software Teams**

Sprint Risk Copilot is an Atlassian Forge application that bridges the gap between raw Jira data and actionable Agile insights. It provides Project Managers and Scrum Masters with a live Risk Analytics Dashboard and an AI-powered Rovo Agent to predict sprint bottlenecks and suggest recovery plans.

## 🎯 The Problem
AI can think, but knowing what to do takes context. Agile teams often miss sprint risks until it is too late—unstarted bugs get deprioritized, and "In Progress" tasks stall. Teams need a way to turn organizational data into a decision that actually moves work forward.

## ✨ Key Features
1. **Live Risk Analytics Dashboard:** A native Jira Project Page that scans issues to calculate a dynamic Risk Level (Low, Medium, High, Critical) based on status, priority, and issue type.
2. **Sprint Risk Copilot (Rovo Agent):** An AI agent that acts as an expert Agile Coach. You can chat with it in Jira, and it will invoke the app's backend logic to fetch current risks and generate a natural-language mitigation plan.

## 🏆 Hackathon Alignment
- **Category:** Apps for Software Teams
- **Bonus Prize:** Best Agents - Rovo/Assignable agents
- **Technology:** Built on Atlassian Forge (UI Kit + Node.js), integrating with the Jira REST API and Rovo Agent modules (`rovo:agent`).

---

## 📺 Demo Video
*(Watch the 3-minute demo on YouTube)*
[Insert your YouTube link here before submitting to Devpost]

---

## 🛠️ Installation & Testing Instructions for Judges

**Important Note:** The risk engine is currently configured to query the **`KAN`** project key to provide a reliable baseline dataset. Please ensure your test site has a Jira project with the key `KAN`.

### Step 1: Install the App
1. Click the official installation link: **[Insert your Atlassian Install Link Here]** *(Note: I have pasted the link you provided below)*
   `https://developer.atlassian.com/console/install/8ffc62c0-e33d-457e-8515-934c673740d5?...`
2. Select your Atlassian site and click **Install**.

### Step 2: Test the UI Dashboard
1. Navigate to a Jira Project with the key **`KAN`**.
2. You will see a new project tab named **"jira-forge-analytics"**.
3. Click on it. You will see the live Risk Dashboard rendering your issues with color-coded Lozenge badges indicating their risk level and reasoning.

### Step 3: Test the Rovo Agent (AI)
1. Open any Jira issue in the `KAN` project.
2. Click the **Rovo (Sparkle ✨)** icon in the top right navigation bar to open Rovo Chat.
3. Click on the agent selector and choose **"Sprint Risk Copilot"**.
4. Ask the agent: 
   > *"What are the risks in the KAN project?"*
5. The AI will invoke the app's custom action, analyze the data, and return an Agile Coach recommendation (e.g., identifying unstarted bugs as High Risk).

---

## 💻 Tech Stack & Architecture
- **Platform:** Atlassian Forge
- **Frontend:** React, `@forge/react` (UI Kit) for native Atlassian styling.
- **Backend:** Node.js 24.x, `@forge/resolver`, `@forge/api`.
- **AI Integration:** `rovo:agent` and `action` modules.
- **Data Source:** Jira REST API (`/rest/api/3/search/jql`).

## 🗺️ Future Roadmap
- **Teamwork Graph Integration:** Enhance the risk engine by querying Teamwork Graph to detect if an assignee is overallocated across multiple projects, adding a "Resource Risk" metric.
- **Dynamic Project Selection:** Allow users to select the target project from a dropdown instead of hardcoding the project key.

## 👨‍💻 Developer
**Mohamed Yehia Hamed**
- GitHub: [@myhifi](https://github.com/myhifi)
- Repo: [jira-forge-analytics](https://github.com/myhifi/jira-forge-analytics)