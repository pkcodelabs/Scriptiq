import { Link } from "react-router-dom";
import {
  UserOutlined,
  MessageOutlined,
  StarOutlined,
  BellOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  fetchCallData,
  selectCallData,
  selectCallLoading,
} from "../redux/slices/userdataslice";
import { Badge } from "antd";
const Header = () => {
  const user = useSelector(selectCallData);
  console.log(user);
  const unreadNotifications = 3;
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-600">
          <img
            src="/images/scriptiqlogo2.png"
            alt="ScriptIQ Logo"
            className="h-20 object-contain w-auto"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <nav className=" flex space-x-6 items-center">
            <Link
              to="/notifications"
              title="notifications"
              className="flex items-center text-gray-700 hover:text-purple-600 font-medium"
            >
              <Badge count={unreadNotifications} overflowCount={99}>
                <BellOutlined className="mr-1 text-lg text-customPurple" />
              </Badge>
            </Link>
          </nav>
          <div>
            {user?.user ? (
              <div className="flex items-center space-x-4 cursor-pointer">
                <Link to="/account" title="account">
                  <UserOutlined className="text-purple-600 pl-2 text-lg" />
                  <span className="text-purple-600 pl-2 font-medium">
                    {user?.user?.username}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
