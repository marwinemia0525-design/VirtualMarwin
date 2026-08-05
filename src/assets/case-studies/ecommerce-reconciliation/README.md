# eCommerce Reconciliation case study screenshots

All three are in place and wired into the gallery in
`src/pages/CaseStudyEcommerceReconciliation.tsx`.

| File | Shows |
|---|---|
| `01-reconciliation-detail-sheet.webp` | Reconciliation Detail tab, 10 rows, one per order, status and flag reason |
| `02-summary-kpi-sheet.webp` | Summary tab, the single roll up row |
| `03-n8n-canvas.webp` | Full five stage pipeline on the n8n canvas |

Sources:

- Detail and Summary tabs: Google Sheet `1d2I4fGuJMckC2IVNFe71fsGzZxvFniv-eBWDCc5CJ6o`
- n8n canvas: workflow `yGLRhYN0aXjvH9bG` on the Render n8n instance

To replace one, drop the new PNG in `_screenshot-drop/` (gitignored) and run:

    ./_screenshot-drop/convert.sh <detail> <summary> <canvas>

Arguments are positional and must be in that order. The script converts to
`.webp` at quality 82 and never upscales.

Known nit, not yet fixed: the flags column in the detail sheet reads
`REFUND_UNRECORDED (Shopify shows refund, no QBO credit found)`, but the
Reconcile Transactions Code node only checks `shopify.refund_amount > 0` and
never inspects QBO. The page body deliberately says the refund "still needs its
QuickBooks credit confirmed" instead. Fixing the screenshot means editing the
flag string in the Code node, clearing the Detail tab (the Sheets node appends),
running once, and re-shooting.
