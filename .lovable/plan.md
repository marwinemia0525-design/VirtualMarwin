Remove the "From First Call to Full Automation" Process section and all navigation links that point to it.

Changes:
1. `src/pages/Index.tsx`
   - Remove the lazy import for `Process`.
   - Remove the `<Reveal><Process /></Reveal>` line from the section stack.

2. `src/components/Navbar.tsx`
   - Remove the `{ href: "#process", label: "Process" }` entry from `navLinks`.

3. `src/components/Footer.tsx`
   - Remove the `<a href="#process">Process</a>` footer link.

4. `src/components/Process.tsx`
   - Delete the now-unused component file.

No other content references the `#process` anchor, so active-nav tracking and smooth-scroll behavior will continue to work for the remaining sections.