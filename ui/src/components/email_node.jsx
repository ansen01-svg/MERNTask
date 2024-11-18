import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Card from "./card";
import { useMyEmailDataContext } from "../store_provider/email_data_provider";
import { useMyRestStatesContext } from "../store_provider/rest_states_data_provider";
import { useReactFlow } from "@xyflow/react";
import { deleteAndUpdateNode } from "../lib/delete_node";

export default function EmailNode({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  const { getEdges, getNodes, setEdges, setNodes } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();

  const {
    emailData: { emailTemplate },
    setEmailData,
  } = useMyEmailDataContext();
  const { setShowEmailModal, setShowDelayModal, setEditingEmailNode } =
    useMyRestStatesContext();

  const editNode = () => {
    const editingData = {
      isEditing: true,
      data: { id: data.id, value: emailTemplate },
    };

    setShowDelayModal(false);
    setShowEmailModal(true);
    setEditingEmailNode(editingData);
  };

  const deleteNode = () => {
    const { updatedNodes, updatedEdges } = deleteAndUpdateNode({
      nodes,
      edges,
      nodeId: data.id,
    });

    setEmailData((prevState) => ({
      ...prevState,
      emailTemplate: "",
      emailBody: { subject: "", body: "" },
    }));
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  return (
    <div
      className="w-[220px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="p-2 flex items-center justify-center gap-2 absolute top-[-15px] right-[-14px]">
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
        icon={<MailOutlineOutlinedIcon />}
        title="Email"
        data={`Template: ${emailTemplate || ""}`}
        iconBgColor="purple-300"
        iconColor="purple-600"
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
