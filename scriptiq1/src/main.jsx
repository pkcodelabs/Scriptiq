import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CountProvider } from "./context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "easzy-form/dist/index.css";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1082458428955-9cgn7164gok4hfhnc8412ehpflc46lnq.apps.googleusercontent.com">
    {" "}
    <CountProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </CountProvider>
  </GoogleOAuthProvider>
);
