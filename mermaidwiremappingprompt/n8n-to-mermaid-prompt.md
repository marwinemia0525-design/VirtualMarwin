# n8n → Mermaid.js Flowchart Prompt

**How to use:** Upload your n8n workflow JSON to any LLM (Claude, ChatGPT, Gemini) and paste the prompt below as your instructions. Copy the output code into [Mermaid Live Editor](https://mermaid.gayo-sphere.cloud).

---

## The Prompt

```
Role: You are an expert n8n Workflow Architect and Mermaid.js specialist.

Task: Analyze the uploaded n8n JSON file and translate its nodes and connections into
a highly structured, color-coded Mermaid.js flowchart.

---

## STEP 1 — Identify Workflows
Group nodes into subgraphs based on their trigger paths.
Each subgraph should be labeled with a number and descriptive name:
  subgraph GetSlots ["1. GetSlots Workflow"]

---

## STEP 2 — Node Mapping Rules

### Standard nodes:
  NodeID("<b>Node Name</b><br/>n8n Node Type"):::className

### Sticky Notes → Explainer boxes:
  NOTE_ID("<b>EXPLAINER:</b><br/>Note content here"):::explainer
  NOTE_ID -.- NodeItDescribes

### Execute Workflow nodes (sub-workflows) → nested subgraph:
  subgraph SUB_NodeID ["↳ Sub: Workflow Name"]
    SUB_NodeID_REF("<b>Execute Workflow</b><br/>Target: WorkflowName"):::subflow
  end

### Split In Batches / Loop nodes:
  LOOP_ID("<b>Node Name</b><br/>Loop Over Items"):::loop
  Add a self-loop edge: LOOP_ID -->|"Next Batch"| LOOP_ID

### Error branches:
  When a node has an onError connection or errorOutput path,
  route it to an error handler node styled with :::error
  Add label: -->|"On Error"|

---

## STEP 3 — Styling Classes

classDef webhook    fill:#f9d0c4,stroke:#e06666,stroke-width:2px
classDef logic      fill:#cfe2f3,stroke:#3d85c6,stroke-width:1px
classDef base       fill:#d9ead3,stroke:#6aa84f,stroke-width:1px
classDef explainer  fill:#fff2cc,stroke:#d6b656,stroke-dasharray:5 5
classDef error      fill:#f4cccc,stroke:#cc0000,stroke-width:2px,stroke-dasharray:3 3
classDef subflow    fill:#e8d5f5,stroke:#8e44ad,stroke-width:1px
classDef loop       fill:#fce5cd,stroke:#e69138,stroke-width:1px

Node type → class mapping:
- Webhook, Form Trigger, Schedule Trigger, Chat Trigger  → webhook
- If, Switch, Filter, Compare Datasets                   → logic
- Execute Workflow                                       → subflow
- Split In Batches, Loop Over Items                      → loop
- Error Trigger, Stop And Error                         → error
- Everything else                                       → base

---

## STEP 4 — Connection Rules

- Normal flow:          A --> B
- Labeled branches:     A -->|"Yes"| B  /  A -->|"No"| C
- Error paths:          A -->|"On Error"| ERR_NODE
- Explainer links:      NOTE -.- A  (dotted, no arrowhead)
- Loop back edge:       LOOP -->|"Next Batch"| LOOP

SYNTAX SAFETY RULES (mandatory):
1. Wrap ALL node labels in double quotes " "
2. Wrap ALL edge labels in double quotes " "
3. Never use raw special characters outside quotes: ? / : # ( )
4. Use flowchart TD (top-down)
5. Every node referenced in connections MUST be declared first

---

## STEP 5 — Output Format

First output the raw Mermaid.js code block:
```mermaid
flowchart TD
  ...
```

Then output a node summary table:
| Node Name | n8n Type | Purpose |
|-----------|----------|---------|

Then list any nodes that were skipped or ambiguous and why.
```

---

## Color Legend

| Color | Class | Used For |
|---|---|---|
| Pink | `webhook` | Webhook, Form Trigger, Schedule Trigger, Chat Trigger |
| Blue | `logic` | If, Switch, Filter, Compare Datasets |
| Green | `base` | All action/processing nodes |
| Yellow dashed | `explainer` | Sticky notes |
| Red dashed | `error` | Error Trigger, Stop And Error, error paths |
| Purple | `subflow` | Execute Workflow (sub-workflows) |
| Orange | `loop` | Split In Batches, Loop Over Items |

---

## What's Handled

- Standard node flow
- Yes/No and multi-branch If/Switch paths
- Error branches with distinct red dashed styling
- Sticky notes linked to the nodes they describe
- Sub-workflow nesting via Execute Workflow nodes
- Loop self-edges for Split In Batches nodes
- Syntax-safe labels (no raw `?` `/` `:` breaking the parser)
- Node summary table + skipped node audit at the end
