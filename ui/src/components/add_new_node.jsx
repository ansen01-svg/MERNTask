import React, { useCallback } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { Handle, Position } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import { isObjectComplete } from "../lib/check_object_has_all_values";

export default function AddNewNode({ data }) {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();

  const { emailData } = useMyEmailDataContext();
  const hasAllValues = isObjectComplete(emailData);

  const addNewNode = useCallback(() => {
    const lastNode = nodes[nodes.length - 2]; // Get the last actual node
    const newNodeId = `node-${nodes.length - 1}`;

    const newNode = {
      id: newNodeId,
      position: { x: 300, y: lastNode.position.y + 100 }, // Fixed x for center alignment
      data: { label: `Node ${nodes.length - 1}` },
      type: "categoryNode",
    };

    const newEdge = {
      id: `e-${lastNode.id}-${newNodeId}`,
      source: lastNode.id,
      target: newNodeId,
    };

    // Update the position of the "Add Node" button
    const updatedAddNodeButton = {
      ...nodes[nodes.length - 1],
      position: { x: 300, y: newNode.position.y + 100 }, // Fixed x for center alignment
    };

    // Filter out any existing edge that connects to the "Add Node" button
    const filteredEdges = edges.filter((edge) => edge.target !== "addNode");

    // Create a new edge connecting the newly added node to the "Add Node" button
    const addNodeEdge = {
      id: `e-${newNodeId}-addNode`,
      source: newNodeId,
      target: updatedAddNodeButton.id,
    };

    setNodes((nds) => [...nds.slice(0, -1), newNode, updatedAddNodeButton]);
    setEdges((eds) => [...filteredEdges, newEdge, addNodeEdge]);
  }, [nodes, edges, setNodes, setEdges]);

  const saveSequence = () => {
    console.log("saved sequence");
  };

  if (hasAllValues) return <SaveWorkFlow saveSequence={saveSequence} />;

  return <AddNode addNewNode={addNewNode} />;
}

function AddNode({ addNewNode }) {
  return (
    <div
      className="px-[4px] py-[3px] border-solid border-[2px] border-[#1976d2] rounded-md"
      onClick={addNewNode}
    >
      <button className="w-full h-full flex items-center justify-center">
        <AddOutlinedIcon sx={{ color: "#1976d2" }} />
      </button>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

function SaveWorkFlow({ saveSequence }) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Button
        variant="contained"
        size="small"
        onClick={saveSequence}
        sx={{ font: "14px", minWidth: "74px", textTransform: "none" }}
      >
        Save
      </Button>
    </div>
  );
}
