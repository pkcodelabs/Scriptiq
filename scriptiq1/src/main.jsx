import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CountProvider } from "./context";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1082458428955-9cgn7164gok4hfhnc8412ehpflc46lnq.apps.googleusercontent.com">
      {" "}
      <CountProvider>
        <App />
      </CountProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
