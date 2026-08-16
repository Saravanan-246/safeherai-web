function RouteLayer({
  points = [],
  color = "#2563eb",
  width = 5,
  opacity = 1,
  dashed = false,
}) {
  if (!points.length) {
    return null;
  }

  const validPoints = points.filter(
    (point) =>
      Array.isArray(point) &&
      point.length >= 2 &&
      Number.isFinite(point[0]) &&
      Number.isFinite(point[1]),
  );

  if (validPoints.length < 2) {
    return null;
  }

  const minX = Math.min(...validPoints.map(([x]) => x));
  const maxX = Math.max(...validPoints.map(([x]) => x));
  const minY = Math.min(...validPoints.map(([, y]) => y));
  const maxY = Math.max(...validPoints.map(([, y]) => y));

  const padding = 24;
  const rangeX = Math.max(maxX - minX, 1);
  const rangeY = Math.max(maxY - minY, 1);

  const svgWidth = 600;
  const svgHeight = 360;

  const path = validPoints
    .map(([x, y], index) => {
      const px =
        padding +
        ((x - minX) / rangeX) * (svgWidth - padding * 2);

      const py =
        svgHeight -
        padding -
        ((y - minY) / rangeY) * (svgHeight - padding * 2);

      return `${index === 0 ? "M" : "L"} ${px} ${py}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-label="Route"
      role="img"
    >
      {/* Route shadow */}

      <path
        d={path}
        fill="none"
        stroke="#ffffff"
        strokeWidth={width + 7}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />

      {/* Route */}

      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? "10 8" : undefined}
        opacity={opacity}
      />
    </svg>
  );
}

export default RouteLayer;