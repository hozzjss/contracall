import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

import { Connect } from "@stacks/connect-react";

import { userSession } from "./user-session.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Connect
        authOptions={{
          appDetails: {
            name: "Stacks React Template",
            icon: window.location.origin + "/logo.png",
          },
          redirectTo: "/",
          onFinish: () => {
            window.location.reload();
          },
          userSession,
        }}
      >
        <App />
      </Connect>
    </QueryClientProvider>
  </React.StrictMode>
);
