import { useState, useEffect, useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function AddLeadNode({ data }) {
  const {
    emailData: { emailId },
    setEmailData,
  } = useMyEmailDataContext();

  const [open, setOpen] = useState(false);
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

  const updateNodesAndEdges = useCallback(() => {
    const newNodes = [
      ...nodes,
      {
        id: "2",
        position: { x: 500, y: 200 },
        type: "startNode",
      },
      {
        id: "3",
        position: { x: 500, y: 300 },
        type: "addNewNode",
      },
    ];

    const newEdges = [
      ...edges,
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
    ];

    setNodes(newNodes);
    setEdges(newEdges);
  }, [nodes, edges, setEdges, setNodes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmailData((prevState) => {
      const oldState = prevState;
      return { ...oldState, emailId: email };
    });
    updateNodesAndEdges();
    setEmail("");
    handleClose();
  };

  return (
    <>
      <FormDialog
        open={open}
        handleClose={handleClose}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
      {emailId ? (
        <LeadPresentUi emailId={emailId} handleClickOpen={handleClickOpen} />
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

function LeadPresentUi({ handleClickOpen, emailId }) {
  const [isHovered, setIsHovered] = useState(false);

  const editNode = () => {
    handleClickOpen();
  };

  return (
    <div
      className="w-[220px] p-3 text-primaryLight bg-primary relative flex items-start justify-center gap-2 border-solid border-[1px] border-slate-300 rounded-sm shadow"
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
          <button className="w-[15px] h-[15px] flex items-center justify-center bg-red-300 rounded-sm">
            <ClearOutlinedIcon sx={{ fontSize: "12px", color: "#dc2626" }} />
          </button>
        </div>
      )}

      <div className="px-3 py-2 bg-red-300 rounded-sm text-red-600">
        <PersonAddAltOutlinedIcon />
      </div>

      <div className="text-[12px]">
        <h1 className="font-medium">Email</h1>
        <p className="text-left">{emailId}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function FormDialog(props) {
  const { open, handleClose, email, setEmail, handleSubmit } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        sx={{ ".MuiPaper-root": { width: "450px", height: "500px" } }}
      >
        <div className="w-full text-right px-3 py-1 border-b-[1px] border-slate-300">
          <button type="button" onClick={handleClose}>
            <ClearOutlinedIcon fontSize="small" sx={{ color: "#2d333a" }} />
          </button>
        </div>
        <div className="w-full px-5 py-4 text-primaryLight">
          <h1 className="text-[18px] font-medium">Add email</h1>
          <p className="text-[12px]">Add email to start the sequence.</p>
        </div>
        <div className="w-full px-5 py-4 flex flex-col items-start justify-center gap-2">
          <label htmlFor="email" className="text-[14px] font-medium">
            Email
          </label>
          <input
            type="text"
            placeholder="Add an email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 text-[14px] px-2 py-2 border-solid border-[1px] border-slate-300 outline-none rounded-sm"
          />
          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ minWidth: "74px", textTransform: "none" }}
            >
              Add
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
