import {
  AppstoreAddOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
  NotificationOutlined,
  ReadOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const adminOnlyPaths = ["/production", "/admin"];
export const employeeOnlyPaths = ["/readscript"];

export const userOnlyPaths = [];
// routes allowed for all users
export const allAllowedOnlyPaths = [
  "/",
  "/account",
  "/notifications",
  //"/payment-receipt",
  "/admin-payments",
];

// all routes with icons/labels
const routesAll = [
  { path: "/", icon: <HomeOutlined />, label: "Home" },
  { path: "/admin", icon: <UserOutlined />, label: "Admin" },
  { path: "/storypost", icon: <FileTextOutlined />, label: "Story Post" },
  { path: "/account", icon: <SettingOutlined />, label: "Account" },
  {
    path: "/notifications",
    icon: <NotificationOutlined />,
    label: "Notifications",
  },
  {
    path: "/payment-receipt",
    icon: <DollarOutlined />,
    label: "Payment Receipt",
  },
  {
    path: "/admin-payments",
    icon: <DollarOutlined />,
    label: "Admin Payments",
  },
  {
    path: "/readscript",
    icon: <ReadOutlined />,
    label: "Read Script",
  },
  { path: "/production", icon: <AppstoreAddOutlined />, label: "Production" },
];

export default routesAll;

// Function to get allowed routes based on role
export const getRoutesByRole = (role, bussinessModal = 1) => {
  let roleAllowedPaths = [];

  if (role === "admin") {
    roleAllowedPaths = adminOnlyPaths;
  } else if (role === "employee") {
    roleAllowedPaths = employeeOnlyPaths;
  } else if (role === "user") {
    roleAllowedPaths = userOnlyPaths;
  }

  // Combine general allowed routes + role-specific routes
  const combinedPaths = [...allAllowedOnlyPaths, ...roleAllowedPaths];

  // Return full route objects from routesAll
  return routesAll.filter((route) => combinedPaths.includes(route.path));
};
