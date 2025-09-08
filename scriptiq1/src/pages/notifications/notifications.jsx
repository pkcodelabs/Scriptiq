import React, { useEffect, useState } from "react";
import { List, Avatar, Typography, Divider } from "antd";
import Header from "../../components/header"; // Assuming you have a header component
import { get } from "../../utils/api"; // Reuse your Axios helper
import { colors } from "../../utils/colors";

const { Text } = Typography;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // const res = await get("/notifications"); // Your API to fetch notifications
        setNotifications([
          {
            name: "Pavan Kumar",
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            message: "Your story was approved!",
            time: "2025-09-07T18:30:00Z",
          },
          {
            name: "Anjali Sharma",
            profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
            message: "New comment on your story.",
            time: "2025-09-07T17:20:00Z",
          },
          {
            name: "Admin",
            profilePic: "/default-avatar.png",
            message: "Your account has been updated.",
            time: "2025-09-07T16:10:00Z",
          },
        ]); // Assume data is array of notifications
      } catch (err) {
        console.error(
          "Failed to fetch notifications:",
          err.response?.data || err.message
        );
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Header />

      <h2 className="text-xl font-semibold text-customPurple mb-4">
        Notifications
      </h2>

      <Divider />

      <List
        itemLayout="horizontal"
        dataSource={notifications}
        locale={{ emptyText: "No notifications yet." }}
        renderItem={(item) => (
          <List.Item className="hover:bg-gray-100 rounded-lg p-2">
            <List.Item.Meta
              avatar={
                <Avatar
                  className="mt-4"
                  src={item.profilePic || "/default-avatar.png"}
                />
              }
              title={
                <div style={{ textAlign: "left" }}>
                  <Text strong style={{ color: colors.customPurple }}>
                    {item.name}
                  </Text>
                  <br />
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      color: colors.customPurple,
                    }}
                  >
                    {new Date(item.time).toLocaleString()}
                  </Text>
                </div>
              }
              description={
                <div style={{ textAlign: "left" }}>{item.message}</div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Notifications;
