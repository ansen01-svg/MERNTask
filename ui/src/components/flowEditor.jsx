import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import AddNewNode from "./addNewNode";
import CategoryNode from "./categoryNode";
import { initialNodes } from "../utils/initial_nodes";
import { initialEdges } from "../utils/initial_edges";

const nodeTypes = {
  addNewNode: AddNewNode,
  categoryNode: CategoryNode,
};

// Main FlowEditor Component
export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Load nodes and edges from localStorage on component mount
  useEffect(() => {
    const savedNodes = JSON.parse(localStorage.getItem("nodes"));
    const savedEdges = JSON.parse(localStorage.getItem("edges"));

    if (savedNodes) setNodes(savedNodes);
    if (savedEdges) setEdges(savedEdges);
  }, [setNodes, setEdges]);

  // Save nodes and edges to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  }, [nodes, edges]);

  // Handle new edge connections made by dragging
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-[calc(100vh-65px)] bg-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
