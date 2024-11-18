import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </main>
    </div>
  );
}

export default App;
