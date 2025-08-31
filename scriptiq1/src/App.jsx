import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/user/user";
import AdminPage from "./pages/admin/adminpage";
import ProductionPage from "./pages/production/production";
import Login from "./pages/login/login";
import Messagechat from "./pages/message/messagechat";

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
