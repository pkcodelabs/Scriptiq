// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import UserPage from "./pages/user/user";
// import AdminPage from "./pages/admin/adminpage";
// import ProductionPage from "./pages/production/production";
// import Login from "./pages/login/login";
// import Messagechat from "./pages/message/messagechat";
// import StoryPost from "./pages/storypost/storypost";
// import Account from "./pages/account/account";
// import ReadStory from "./pages/readstory/readstory";
// import Notifications from "./pages/notifications/notifications";
// import AdminPayments from "./pages/admin/adminpayments";
// import PaymentReceipt from "./pages/admin/paymentreciept";
// import Siderbar from "./components/siderbar";

// // wrapper for protected routes
// const PrivateRoute = ({ children }) => {
//   const user = localStorage.getItem("user");
//   return user ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           {/* protected routes */}
//           <Route
//             path="/"
//             element={
//               <Siderbar>
//                 <PrivateRoute>
//                   <UserPage />
//                 </PrivateRoute>
//               </Siderbar>
//             }
//           />
//           <Route
//             path="/admin"
//             element={
//               <PrivateRoute>
//                 <AdminPage />
//               </PrivateRoute>
//             }
//           />{" "}
//           <Route
//             path="/storypost"
//             element={
//               <PrivateRoute>
//                 <StoryPost />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/account"
//             element={
//               <PrivateRoute>
//                 <Account />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/readscript"
//             element={
//               <PrivateRoute>
//                 <ReadStory />
//               </PrivateRoute>
//             }
//           />{" "}
//           <Route
//             path="/notifications"
//             element={
//               <PrivateRoute>
//                 <Notifications />
//               </PrivateRoute>
//             }
//           />{" "}
//           <Route
//             path="/payment-receipt"
//             element={
//               <PrivateRoute>
//                 <PaymentReceipt />
//               </PrivateRoute>
//             }
//           />{" "}
//           <Route
//             path="/admin-payments"
//             element={
//               <PrivateRoute>
//                 <AdminPayments />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/production"
//             element={
//               <PrivateRoute>
//                 <ProductionPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/message"
//             element={
//               <PrivateRoute>
//                 <Messagechat />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import UserPage from "./pages/user/user";
import AdminPage from "./pages/admin/adminpage";
import ProductionPage from "./pages/production/production";
import Login from "./pages/login/login";
import Messagechat from "./pages/message/messagechat";
import StoryPost from "./pages/storypost/storypost";
import Account from "./pages/account/account";
import ReadStory from "./pages/readstory/readstory";
import Notifications from "./pages/notifications/notifications";
import AdminPayments from "./pages/admin/adminpayments";
import PaymentReceipt from "./pages/admin/paymentreciept";
import Siderbar from "./components/siderbar";

import { useLocation } from "react-router-dom";
import { adminOnlyPaths, employeeOnlyPaths } from "./dashboard/dashroutes";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPath = location.pathname;

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Block access to /production if user is not admin
  if (adminOnlyPaths.includes(currentPath) && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (employeeOnlyPaths.includes(currentPath) && user.role !== "employee") {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ProtectedLayout inline implementation
const ProtectedLayout = () => (
  <div className="p-4 ml-4 md:ml-8 lg:ml-10">
    <Siderbar />
    <Outlet />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<UserPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="storypost" element={<StoryPost />} />
          <Route path="account" element={<Account />} />
          <Route path="readscript" element={<ReadStory />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payment-receipt" element={<PaymentReceipt />} />
          <Route path="admin-payments" element={<AdminPayments />} />
          <Route path="production" element={<ProductionPage />} />
          <Route path="message" element={<Messagechat />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
