type ArrowIconProps = {
  direction?: "up-right" | "right" | "left";
  className?: string;
};

export default function ArrowIcon({ direction = "up-right", className }: ArrowIconProps) {
  const path = direction === "right"
    ? "M2 8h12M10 4l4 4-4 4"
    : direction === "left"
      ? "M14 8H2m4-4L2 8l4 4"
      : "M3 13 13 3M6 3h7v7";

  return (
    <svg className={className ? `arrow-icon ${className}` : "arrow-icon"} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}
