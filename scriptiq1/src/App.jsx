import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/user/user";
import AdminPage from "./pages/admin/adminpage";
import ProductionPage from "./pages/production/production";
import Login from "./pages/login/login";
import Messagechat from "./pages/message/messagechat";
import StoryPost from "./pages/storypost/storypost";
import Account from "./pages/account/account";
import ReadStory from "./pages/readstory/readstory";
import Notifications from "./pages/notifications/notifications";

// wrapper for protected routes
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/storypost"
            element={
              <PrivateRoute>
                <StoryPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/readscript"
            element={
              <PrivateRoute>
                <ReadStory />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/production"
            element={
              <PrivateRoute>
                <ProductionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/message"
            element={
              <PrivateRoute>
                <Messagechat />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
