import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/index.css";
import { ReactFlowProvider } from "reactflow";
import { CustomReactFlowProvider } from "./hooks/ReactFlow/customReactFlowProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <CustomReactFlowProvider>
        <App />
      </CustomReactFlowProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);
