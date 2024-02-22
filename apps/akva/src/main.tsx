import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"

import { Connect } from "@stacks/connect-react"

import { userSession } from "./user-session.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: "Akva",
          icon:
            window.location.origin + import.meta.env.BASE_URL + "/akva.jpeg",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload()
        },
        userSession,
      }}
    >
      <App />
    </Connect>
  </React.StrictMode>,
)
