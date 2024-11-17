import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Dialog from "@mui/material/Dialog";

export default function MyDialog(props) {
  const { open, handleClose, handleSubmit, children, title, description } =
    props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={
          handleSubmit
            ? {
                component: "form",
                onSubmit: handleSubmit,
              }
            : {}
        }
        sx={{ ".MuiPaper-root": { width: "450px", height: "500px" } }}
      >
        <div className="w-full text-right px-3 py-1 border-b-[1px] border-slate-300">
          <button type="button" onClick={handleClose}>
            <ClearOutlinedIcon fontSize="small" sx={{ color: "#2d333a" }} />
          </button>
        </div>

        <div className="w-full px-5 py-4 text-primaryLight">
          <h1 className="text-[14px] font-medium">{title}</h1>
          <p className="text-[12px]">{description}</p>
        </div>

        {children}
      </Dialog>
    </>
  );
}
