import React from "react";
import FlowEditor from "./components/flowEditor";
import Header from "./components/header";

function App() {
  return (
    <div>
      <Header />
      <main>
        <FlowEditor />
      </main>
    </div>
  );
}

export default App;
