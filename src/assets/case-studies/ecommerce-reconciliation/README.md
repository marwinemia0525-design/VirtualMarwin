# eCommerce Reconciliation case study screenshots

Drop the three exported screenshots here, then uncomment the matching import
lines and the three `screenshots` entries at the top of
`src/pages/CaseStudyEcommerceReconciliation.tsx`.

Expected filenames:

- `01-reconciliation-detail-sheet.webp`
- `02-summary-kpi-sheet.webp`
- `03-n8n-canvas.webp`

Same pipeline as every other case study on the site: `.webp`, roughly 1600px
wide, imported as ES modules so Vite fingerprints and hashes them at build time.
The gallery grid renders at a 16:10 aspect ratio with `object-top`, so crop with
the important content near the top of the frame.

Sources:

- Detail and Summary sheets: https://docs.google.com/spreadsheets/d/1d2I4fGuJMckC2IVNFe71fsGzZxvFniv-eBWDCc5CJ6o/edit
- n8n canvas: workflow `yGLRhYN0aXjvH9bG` on the Render n8n instance

Until the files land, the page still ships proof: the reconciliation detail rows
and the summary KPI row render as real HTML tables, so the section is never
empty.
