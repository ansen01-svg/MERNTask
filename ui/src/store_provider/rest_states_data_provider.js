import { useContext, createContext, useState } from "react";

const RestStatesContext = createContext(null);

const initialEditingEmailNodeValue = {
  isEditing: false,
  data: { id: "", value: "" },
};

const initialEditingDelayNodeValue = {
  isEditing: false,
  data: { id: "", value: { type: "", by: "" } },
};

export const RestStatesContextProvider = ({ children }) => {
  const [editingEmailNode, setEditingEmailNode] = useState(
    initialEditingEmailNodeValue
  );
  const [editingDelayNode, setEditingDelayNode] = useState(
    initialEditingDelayNodeValue
  );
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);

  return (
    <RestStatesContext.Provider
      value={{
        editingEmailNode,
        setEditingEmailNode,
        editingDelayNode,
        setEditingDelayNode,
        showEmailModal,
        showDelayModal,
        setShowEmailModal,
        setShowDelayModal,
      }}
    >
      {children}
    </RestStatesContext.Provider>
  );
};

export const useMyRestStatesContext = () => {
  return useContext(RestStatesContext);
};
