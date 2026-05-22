import React from "react";

interface VerticalDividerProps {
  height?: string | number; // e.g., "100%", "50px"
  thickness?: string | number; // e.g., "1px", "2px"
  color?: string; // e.g., "#ccc", "black"
  margin?: string | number; // e.g., "0 8px"
}

const VerticalDivider: React.FC<VerticalDividerProps> = ({
  height = "100%",
  thickness = "1px",
  color = "#ccc",
  margin = "0 8px",
}) => {
  return (
    <div
      style={{
        height,
        width: thickness,
        backgroundColor: color,
        margin,
        flexShrink: 0, // Prevent shrinking in flex layouts
      }}
    />
  );
};

export default VerticalDivider;
