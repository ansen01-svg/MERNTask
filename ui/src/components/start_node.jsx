import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function StartNode({ data }) {
  return (
    <div className="w-[220px] px-3 py-2 text-center bg-primary border-solid border-[1px] border-slate-300 rounded shadow">
      <Handle type="target" position={Position.Top} />
      <p className="text-[12px] text-primaryLight">Start of sequence</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
