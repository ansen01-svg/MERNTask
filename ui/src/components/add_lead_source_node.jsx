import { useState, useEffect, useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import Button from "@mui/material/Button";
import Card from "./card";
import MyDialog from "./dialog";
import TextInput from "./text_input";
import { nodesWithLead } from "../utils/initial_nodes";
import { edgesWithLead } from "../utils/initial_edges";
import { deleteAndUpdateNode } from "../lib/delete_node";

export default function AddLeadNode({ data }) {
  const {
    emailData: { emailId },
    setEmailData,
  } = useMyEmailDataContext();

  const [open, setOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(emailId || "");

  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // sets email whenever emailId changes
  useEffect(() => {
    if (emailId) {
      setEmail(emailId);
    }
  }, [emailId]);

  // update nodes and edges
  const updateNodesAndEdges = useCallback(() => {
    const newNodes = [...nodes, ...nodesWithLead];
    const newEdges = [...edges, ...edgesWithLead];

    setNodes(newNodes);
    setEdges(newEdges);
  }, [nodes, edges, setEdges, setNodes]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setEmailData((prevState) => {
      const oldState = prevState;
      return { ...oldState, emailId: email };
    });

    if (!isEditingEmail) {
      updateNodesAndEdges();
    }
    setEmail("");
    setIsEditingEmail(false);
    handleClose();
  };

  const editNode = () => {
    handleClickOpen();
    setIsEditingEmail(true);
  };

  const deleteNode = () => {
    const { updatedNodes, updatedEdges } = deleteAndUpdateNode({
      nodes,
      edges,
      nodeId: data.id,
    });

    setEmailData((prevState) => ({ ...prevState, emailId: "" }));
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  return (
    <>
      <FormDialog
        open={open}
        handleClose={handleClose}
        emailId={emailId}
        email={email}
        handleEmailChange={handleEmailChange}
        handleSubmit={handleSubmit}
      />
      {emailId ? (
        <LeadPresentUi
          emailId={emailId}
          handleClickOpen={handleClickOpen}
          setIsEditingEmail={setIsEditingEmail}
          editNode={editNode}
          deleteNode={deleteNode}
        />
      ) : (
        <LeadAbsentUi handleClickOpen={handleClickOpen} />
      )}
    </>
  );
}

function LeadAbsentUi({ handleClickOpen }) {
  return (
    <div className="w-[220px] px-3 py-1 flex flex-col items-center justify-center text-primaryLight bg-primary border-solid border-[1px] border-slate-300 rounded shadow">
      <button onClick={handleClickOpen}>
        <AddOutlinedIcon />
      </button>
      <span className="text-[12px] text-center">
        Click to select lead and start an email sequence.
      </span>
    </div>
  );
}

function LeadPresentUi(props) {
  const { editNode, deleteNode, emailId } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[220px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="p-2 flex items-center justify-center gap-2 absolute top-[-18px] right-[-16px]">
          <button
            onClick={editNode}
            className="w-[15px] h-[15px] flex items-center justify-center bg-red-300 rounded-sm"
          >
            <EditOutlinedIcon sx={{ fontSize: "12px", color: "#dc2626" }} />
          </button>
          <button
            onClick={deleteNode}
            className="w-[15px] h-[15px] flex items-center justify-center bg-red-300 rounded-sm"
          >
            <ClearOutlinedIcon sx={{ fontSize: "12px", color: "#dc2626" }} />
          </button>
        </div>
      )}

      <Card
        icon={<PersonAddAltOutlinedIcon />}
        title="Email"
        data={emailId}
        iconBgColor="red-300"
        iconColor="red-600"
      />

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function FormDialog(props) {
  const { open, handleClose, email, handleEmailChange, handleSubmit } = props;

  return (
    <MyDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title="Add Email"
      description="Add an email to start the sequence."
    >
      <DialogContent email={email} handleChange={handleEmailChange} />
    </MyDialog>
  );
}

function DialogContent(props) {
  const { email, handleChange } = props;

  return (
    <div className="w-full px-5 py-4 flex flex-col items-start justify-center gap-2">
      <TextInput
        type="text"
        value={email}
        handleChange={handleChange}
        label="Email"
        labelFor="email"
      />
      <div className="w-full flex items-center justify-end">
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={!email}
          sx={{ minWidth: "74px", textTransform: "none" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
