import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { Handle, Position } from "@xyflow/react";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import { isObjectComplete } from "../lib/check_object_has_all_values";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import { useMyRestStatesContext } from "../store_provider/rest_states_data_provider";
import Card from "./card";
import MyDialog from "./dialog";

export default function AddNewNode({ data }) {
  const [open, setOpen] = useState(false);

  const { emailData, saveSequence } = useMyEmailDataContext();
  const hasAllValues = isObjectComplete(emailData);
  const { setShowEmailModal, setShowDelayModal } = useMyRestStatesContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectEmail = () => {
    handleClose();
    setShowDelayModal(false);
    setShowEmailModal(true);
  };

  const handleSelectDelay = () => {
    handleClose();
    setShowEmailModal(false);
    setShowDelayModal(true);
  };

  const saveEmailSequence = async () => {
    console.log("saved sequence");
    const result = await saveSequence();
    console.log(result);
  };

  if (hasAllValues)
    return <SaveWorkFlow saveEmailSequence={saveEmailSequence} />;

  return (
    <>
      <SelectActionOptionsDialog
        open={open}
        emailData={emailData}
        handleClose={handleClose}
        handleSelectEmail={handleSelectEmail}
        handleSelectDelay={handleSelectDelay}
      />
      <AddNode handleClickOpen={handleClickOpen} />
    </>
  );
}

function AddNode({ handleClickOpen }) {
  return (
    <div className="px-[4px] py-[3px] border-solid border-[2px] border-[#1976d2] rounded-md">
      <button
        onClick={handleClickOpen}
        className="w-full h-full flex items-center justify-center"
      >
        <AddOutlinedIcon sx={{ color: "#1976d2" }} />
      </button>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

function SaveWorkFlow({ saveEmailSequence }) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Button
        variant="contained"
        size="small"
        onClick={saveEmailSequence}
        sx={{ font: "14px", minWidth: "74px", textTransform: "none" }}
      >
        Save
      </Button>
    </div>
  );
}

function SelectActionOptionsDialog(props) {
  const { open, handleClose, emailData, handleSelectEmail, handleSelectDelay } =
    props;

  return (
    <MyDialog
      open={open}
      handleClose={handleClose}
      title="Add Blocks"
      description="Click on a block to add it to workflow sequence."
    >
      <DialogContent
        emailData={emailData}
        handleSelectEmail={handleSelectEmail}
        handleSelectDelay={handleSelectDelay}
      />
    </MyDialog>
  );
}

function DialogContent(props) {
  const { handleSelectEmail, handleSelectDelay, emailData } = props;

  return (
    <div className="w-full px-5 py-4 flex flex-col items-start justify-center gap-5">
      <button
        onClick={handleSelectEmail}
        className="w-full flex flex-col items-start justify-center gap-2"
      >
        <h1 className="text-[14px] font-medium">Outreach</h1>
        <Card
          icon={<MailOutlineOutlinedIcon />}
          title="Email"
          data="Send an email to a lead"
          iconBgColor="red-300"
          iconColor="red-600"
        />
      </button>

      {emailData.emailTemplate && (
        <button
          onClick={handleSelectDelay}
          className="w-full flex flex-col items-start justify-center gap-2"
        >
          <h1 className="text-[14px] font-medium">Conditions</h1>
          <Card
            icon={<WatchLaterOutlinedIcon />}
            title="Wait"
            data="Set a delay (in hours)"
            iconBgColor="red-300"
            iconColor="red-600"
          />
        </button>
      )}
    </div>
  );
}