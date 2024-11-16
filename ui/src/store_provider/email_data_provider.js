import { useContext, createContext, useState } from "react";

const EmailDataContext = createContext(null);

const initialEmailData = {
  emailId: "",
  emailBody: { subject: "", body: "" },
  delay: 0,
};

export const EmailDataContextProvider = ({ children }) => {
  const [emailData, setEmailData] = useState(initialEmailData);

  return (
    <EmailDataContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </EmailDataContext.Provider>
  );
};

export const useMyEmailDataContext = () => {
  return useContext(EmailDataContext);
};
