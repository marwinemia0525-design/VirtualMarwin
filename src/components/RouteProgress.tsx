/**
 * Loading bar for lazy route chunks.
 *
 * Rendered as the Suspense fallback for the code-split routes, so it exists
 * only while a chunk is in flight and unmounts the moment it lands. That
 * keeps it entirely off the first-paint path: the home route is eager, so
 * this never renders on a cold visit.
 *
 * All motion is CSS (see .route-progress in index.css). There is no state,
 * no timer and no rAF, so it costs nothing beyond one composited layer.
 */
const RouteProgress = () => (
  <div
    className="route-progress"
    role="progressbar"
    aria-label="Loading page"
    aria-valuetext="Loading"
  />
);

export default RouteProgress;
