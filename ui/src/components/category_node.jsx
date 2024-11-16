import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function CategoryNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "white",
      }}
    >
      {data.label}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
