import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  NotificationOutlined,
  DollarOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getRoutesByRole } from "../dashboard/dashroutes";
const Siderbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const allowedRoutes = getRoutesByRole(user.role);
  console.log(user, allowedRoutes);
  return (
    <div>
      <div className="relative my-10">
        <div className="fixed top-1/2 left-0 -translate-y-1/2 transform">
          <div className="flex flex-col items-center -translate-x-7 hover:translate-x-0 justify-center relative transition-transform duration-500 ease-out">
            <div className="rounded-full bg-purple-400 py-4 pr-2 relative">
              <div
                className="bg-gradient-to-tr from-[white_50%] to-transparent w-10 h-[41px] rounded-full absolute -top-10 right-0"
                style={{ clipPath: "inset(40% 0 0 0)" }}
              ></div>
              <div className="bg-white w-10 h-[41px] rounded-full absolute -bottom-10 right-0"></div>

              {allowedRoutes.map((route) => (
                <div
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className="border-2 w-8 h-8 cursor-pointer"
                  title={route.label} //div has  tile  which is build in popup  text
                >
                  {route.icon}
                </div>
              ))}
            </div>

            {/* Decorative pseudo-elements */}
            <div className="absolute -z-10 bg-purple-400 w-6 h-12 -top-5 left-0"></div>
            <div className="absolute -z-10 bg-purple-400 w-6 h-12 -bottom-5 left-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Siderbar;
