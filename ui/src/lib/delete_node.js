export const deleteAndUpdateNode = ({ nodes, edges, nodeId }) => {
  // Find the edges connected to the node to be deleted
  const incomingEdge = edges.find((edge) => edge.target === nodeId);
  const outgoingEdge = edges.find((edge) => edge.source === nodeId);

  // Filter out the node and its edges
  const updatedNodes = nodes.filter((node) => node.id !== nodeId);
  const updatedEdges = edges.filter(
    (edge) => edge.source !== nodeId && edge.target !== nodeId
  );

  // Ensure only one edge remains
  if (incomingEdge && outgoingEdge) {
    const newEdge = {
      id: `e-${incomingEdge.source}-${outgoingEdge.target}`,
      source: incomingEdge.source,
      target: outgoingEdge.target,
    };
    updatedEdges.push(newEdge);
  } else if (incomingEdge) {
    updatedEdges.push(incomingEdge);
  } else if (outgoingEdge) {
    updatedEdges.push(outgoingEdge);
  }

  return { updatedNodes, updatedEdges };
};
