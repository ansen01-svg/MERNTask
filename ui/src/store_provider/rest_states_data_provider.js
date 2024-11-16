import { useContext, createContext, useState } from "react";

const RestStatesContext = createContext(null);

const initialEditingNodeValue = {
  isEditing: false,
  id: "",
  data: "",
};

export const RestStatesContextProvider = ({ children }) => {
  const [editingNode, setEditingNode] = useState(initialEditingNodeValue);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDelayModal, setShowDelayModal] = useState(false);

  return (
    <RestStatesContext.Provider
      value={{
        editingNode,
        setEditingNode,
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
