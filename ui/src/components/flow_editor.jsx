import React, { useCallback, useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import AddLeadNode from "./add_lead_source_node";
import StartNode from "./start_node";
import AddNewNode from "./add_new_node";
import EmailNode from "./email_node";
import DelayNode from "./delay_node";
import { initialNodes } from "../utils/initial_nodes";
import { useMyRestStatesContext } from "../store_provider/rest_states_data_provider";
import MyDialog from "./dialog";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import SelectInput from "./select_input";
import TextInput from "./text_input";
import { emailTemplates } from "../utils/email_templates";

const nodeTypes = {
  addLeadNode: AddLeadNode,
  startNode: StartNode,
  emailNode: EmailNode,
  delayNode: DelayNode,
  addNewNode: AddNewNode,
};

export default function FlowEditor() {
  const {
    showEmailModal,
    showDelayModal,
    setShowEmailModal,
    setShowDelayModal,
    editingEmailNode,
    setEditingEmailNode,
    editingDelayNode,
    setEditingDelayNode,
  } = useMyRestStatesContext();
  const { emailData, setEmailData } = useMyEmailDataContext();

  const [emailTemplate, setEmailTemplate] = useState(
    emailData.emailTemplate || ""
  );
  const [delay, setDelay] = useState(emailData.delay || { type: "", by: "" });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleCloseDelayModal = () => {
    setShowDelayModal(false);
  };

  const handleEmailTemplateChange = (e) => {
    setEmailTemplate(e.target.value);
  };

  const handleDelayChange = (e) => {
    setDelay({ ...delay, [e.target.name]: e.target.value });
  };

  // add a new node
  const addNewNode = useCallback(
    (type) => {
      const lastNode = nodes[nodes.length - 2]; // Get the last actual node
      const newNodeId = `${nodes.length - 1}`;

      const newNode = {
        id: newNodeId,
        position: { x: lastNode.position.x, y: lastNode.position.y + 100 },
        type: type,
        data: { id: newNodeId, type: type },
      };

      const newEdge = {
        id: `e-${lastNode.id}-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId,
      };

      const newNodeX = lastNode.position.x + 220 / 2 - 90 / 2;

      // Update the position of the "Add Node" button
      const updatedAddNodeButton = {
        ...nodes[nodes.length - 1],
        id: (parseInt(newNodeId) + 1).toString(),
        // position: { x: lastNode.position.x, y: newNode.position.y + 100 },
        position: { x: newNodeX, y: newNode.position.y + 100 },
        data: {
          ...nodes[nodes.length - 1].data,
          id: (parseInt(newNodeId) + 1).toString(),
        },
      };

      // Filter out any existing edge that connects to the "Add Node" button
      const filteredEdges = edges.filter((edge) => edge.target !== newNodeId);

      // Create a new edge connecting the newly added node to the "Add Node" button
      const addNodeEdge = {
        id: `e-${newNodeId}-${updatedAddNodeButton.id}`,
        source: newNodeId,
        target: updatedAddNodeButton.id,
      };

      setNodes((nds) => [...nds.slice(0, -1), newNode, updatedAddNodeButton]);
      setEdges((eds) => [...filteredEdges, newEdge, addNodeEdge]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  // submit email dialog form
  const handleSubmitEmailDialog = (e) => {
    e.preventDefault();

    setEmailData((prevState) => ({
      ...prevState,
      emailTemplate,
    }));

    if (!editingEmailNode.isEditing) {
      addNewNode("emailNode");
    }

    setEditingEmailNode({
      isEditing: false,
      data: { id: "", value: "" },
    });
    handleCloseEmailModal();
  };

  // submit delay dialog form
  const handleSubmitDelayDialog = (e) => {
    e.preventDefault();

    setEmailData((prevState) => ({
      ...prevState,
      delay,
    }));

    if (!editingDelayNode.isEditing) {
      addNewNode("delayNode");
    }

    setEditingDelayNode({
      isEditing: false,
      data: { id: "", value: { type: "", by: "" } },
    });
    handleCloseDelayModal();
  };

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
    <div className="w-full h-[calc(100vh-65px)] bg-slate-100 rounded-lg">
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
        {showEmailModal && (
          <EmailDialog
            showEmailModal={showEmailModal}
            handleCloseEmailModal={handleCloseEmailModal}
            emailTemplate={emailTemplate}
            handleEmailTemplateChange={handleEmailTemplateChange}
            handleSubmitEmailDialog={handleSubmitEmailDialog}
          />
        )}
        {showDelayModal && (
          <DelayDialog
            showDelayModal={showDelayModal}
            handleCloseDelayModal={handleCloseDelayModal}
            delay={delay}
            handleDelayChange={handleDelayChange}
            handleSubmitDelayDialog={handleSubmitDelayDialog}
          />
        )}
      </ReactFlow>
    </div>
  );
}

function EmailDialog(props) {
  const {
    showEmailModal,
    handleCloseEmailModal,
    emailTemplate,
    handleEmailTemplateChange,
    handleSubmitEmailDialog,
  } = props;

  return (
    <MyDialog
      open={showEmailModal}
      handleClose={handleCloseEmailModal}
      handleSubmit={handleSubmitEmailDialog}
      title="Cold Email"
      description="Send an email to a lead."
    >
      <EmailDialogContent
        emailTemplate={emailTemplate}
        handleEmailTemplateChange={handleEmailTemplateChange}
      />
    </MyDialog>
  );
}

function DelayDialog(props) {
  const {
    showDelayModal,
    handleCloseDelayModal,
    delay,
    handleDelayChange,
    handleSubmitDelayDialog,
  } = props;

  return (
    <MyDialog
      open={showDelayModal}
      handleClose={handleCloseDelayModal}
      handleSubmit={handleSubmitDelayDialog}
      title="Cold Email"
      description="Send an email to a lead."
    >
      <DelayDialogContent delay={delay} handleDelayChange={handleDelayChange} />
    </MyDialog>
  );
}

function EmailDialogContent({ emailTemplate, handleEmailTemplateChange }) {
  return (
    <div className="w-full px-5 py-4 flex flex-col items-start justify-center gap-2">
      <SelectInput
        label="Email Template"
        labelFor="email-temlate"
        placeholder={"Select template"}
        value={emailTemplate}
        handleChange={handleEmailTemplateChange}
        options={emailTemplates}
      />
      <div className="w-full flex items-center justify-end">
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!emailTemplate}
          sx={{ minWidth: "74px", textTransform: "none" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

function DelayDialogContent({ delay, handleDelayChange }) {
  return (
    <div className="w-full px-5 py-4 flex flex-col items-start justify-center gap-2">
      <TextInput
        type="number"
        value={delay.by}
        handleChange={handleDelayChange}
        label="Delay by"
        labelFor="by"
      />
      <SelectInput
        label="Delay type"
        labelFor="type"
        placeholder={"Select delay type"}
        value={delay.type}
        handleChange={handleDelayChange}
        options={["Day", "Hours"]}
      />
      <div className="w-full flex items-center justify-end">
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!delay.by || !delay.type}
          sx={{ minWidth: "74px", textTransform: "none" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
