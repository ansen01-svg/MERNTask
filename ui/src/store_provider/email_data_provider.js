import { useContext, createContext, useState, useEffect } from "react";
import { emailTypes } from "../utils/email_templates";
import { isObjectComplete } from "../lib/check_object_has_all_values";
import { postEmail } from "../lib/post_email";

const EmailDataContext = createContext(null);

const initialEmailData = {
  emailId: "",
  emailTemplate: "",
  emailBody: { subject: "", body: "" },
  delay: { type: "", by: "" },
};

export const EmailDataContextProvider = ({ children }) => {
  const [emailData, setEmailData] = useState(initialEmailData);

  console.log(emailData);

  // save sequence
  const saveSequence = async () => {
    const hasAllFields = isObjectComplete(emailData);

    if (!hasAllFields) return;

    // post email to api
    const result = await postEmail(emailData);
    return result;
  };

  // update email subject and body whenever email template changes
  useEffect(() => {
    if (emailData.emailTemplate) {
      const email = emailTypes.filter(
        (email) => email.emailTemplate === emailData.emailTemplate
      );

      setEmailData((prevstate) => {
        const oldEmailData = prevstate;
        const emailBody = {
          subject: email[0].emailSubject,
          body: email[0].emailBody,
        };

        return {
          ...oldEmailData,
          emailBody,
        };
      });
    }
  }, [emailData.emailTemplate]);

  return (
    <EmailDataContext.Provider
      value={{ emailData, setEmailData, saveSequence }}
    >
      {children}
    </EmailDataContext.Provider>
  );
};

export const useMyEmailDataContext = () => {
  return useContext(EmailDataContext);
};
