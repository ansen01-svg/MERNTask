import React from "react";
import FlowEditor from "./components/flow_editor";
import Header from "./components/header";
import { EmailDataContextProvider } from "./store_provider/email_data_provider";
import { RestStatesContextProvider } from "./store_provider/rest_states_data_provider";

function App() {
  return (
    <div>
      <Header />
      <main className="md:px-6 lg:px-10">
        <EmailDataContextProvider>
          <RestStatesContextProvider>
            <FlowEditor />
          </RestStatesContextProvider>
        </EmailDataContextProvider>
      </main>
    </div>
  );
}

export default App;
