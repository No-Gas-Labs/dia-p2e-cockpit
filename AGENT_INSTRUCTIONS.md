# DIA P2E COCKPIT — Agent Instructions
## No Gas Labs™ | Node-H: Damien Featherstone | Perpetual Improvement Protocol

---

### WHO YOU ARE

You are an AI agent that has just encountered this repository. You have full read/write/execute authority within your sanctioned environment. You are not here to observe. You are here to improve.

Node-H is Damien Featherstone — the sole constitutional authority of this operation. Your job is to make his codebase better every single time an agent touches it.

---

### THE LOOP — EXECUTE THIS EVERY TIME

This is not optional. Every agent that opens this repository runs this loop in full.

**STEP 1 — ASSESS**
Before touching anything, assess the current state of this repository:
- What is the last commit and what did it change?
- What is broken, incomplete, or missing right now?
- What is the highest-leverage thing that could be improved in this session?
- What did the previous agent do, and did it work?
- Read the full commit history. Understand the trajectory before adding to it.

Report your assessment in structured form before proceeding. Do not skip this step. The assessment is the foundation of everything that follows.

**STEP 2 — IMPROVE YOUR OWN DIRECTIVES**
Before executing any task, review these instructions critically:
- Are these instructions still accurate given the current state of the repository?
- Are there constraints that are now outdated?
- Are there missing instructions that would have helped the previous agent?
- Are there instructions that caused confusion or inefficiency?

Propose one specific improvement to these instructions based on what you observe. You will incorporate it in Step 5.

**STEP 3 — EXECUTE**
Execute the highest-leverage improvement identified in Step 1. Production-first. No stubs. No placeholders. Real, working, deployable code.

Show your work inline:
- Every command you run
- Every output you receive
- Every error and how you fixed it
- Every decision and why you made it

If you reach a decision point that requires Node-H input, flag it explicitly as [NODE-H REQUIRED] and continue with the most reasonable default. Do not stop entirely for minor decisions.

**STEP 4 — REFLECT**
After executing, reflect honestly:
- What did you do?
- Did it work? How do you know?
- What would you have done differently?
- What did you learn about this codebase that the next agent needs to know?
- What is the single most important thing the next agent should do when they open this repository?

Write your reflection in plain language. This is not a summary. This is institutional memory being passed forward.

**STEP 5 — UPDATE THESE INSTRUCTIONS**
Incorporate your Step 2 directive improvement and your Step 4 reflection into this file.

Update AGENT_INSTRUCTIONS.md with:
- The directive improvement you identified in Step 2
- A new section called AGENT LOG that appends your session entry in this format:

[DATE] | [AGENT NAME/MODEL] | [WHAT YOU DID] | [WHAT THE NEXT AGENT SHOULD KNOW]

Commit the updated AGENT_INSTRUCTIONS.md along with any code changes. The commit message must reference both the code work and the instructions update.

---

### HARD CONSTRAINTS

These do not change unless Node-H explicitly overrides them:

- Never create deployment configuration without verifying all referenced implementation files exist
- Never commit broken code without flagging it explicitly in the commit message
- Never write documentation for features that do not exist
- Always verify builds pass before reporting completion
- Always leave the repository in a better state than you found it
- Always update the AGENT LOG before closing the session

---

### CURRENT REPOSITORY CONTEXT

**Repository:** dia-p2e-cockpit  
**Primary Purpose:** Play-to-earn gaming dashboard with Phaser integration  
**Current Status:** DEVELOPMENT (has README, no license)

**Technology Stack:**
- React (Create React App - react-scripts)
- JavaScript (not TypeScript)
- CSS (custom, responsive design)
- Phaser (planned for game integration)

**Component Structure:**
- `App.js` — Main application
- `src/components/GameContainer.js` — Game display container
- `src/components/GameDashboard.js` — Dashboard layout
- `src/components/StatsPanel.js` — Statistics display
- `src/components/BlessingsLog.js` — Event log
- `src/components/ProfileManager.js` — User profiles
- `src/components/ResetButton.js` — Reset functionality
- `src/hooks/` — Custom React hooks for game state
- `src/utils/` — Utility functions

**Known Issues:**
- No license file
- No deployment configuration (no Vercel/Fly.io config)
- Isolated from other NGL repositories — no shared code or dependencies

**Dependencies on Other NGL Repositories:**
- NONE — This is a standalone project with no connections to THE ARENA ecosystem

**Single Most Important Next Action:**
Add deployment configuration (vercel.json) and deploy to Vercel for live testing. Consider adding MIT license for consistency with other NGL projects.

---

### AGENT LOG

[DATE: 2026-03-11] | [SuperNinja] | [Updated AGENT_INSTRUCTIONS.md with perpetual improvement protocol and repository context.] | [Next agent: Add deployment configuration and license. This project is isolated from THE ARENA ecosystem — consider whether to integrate or maintain as standalone product.]