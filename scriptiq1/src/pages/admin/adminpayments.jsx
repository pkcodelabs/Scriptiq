// import { useNavigate } from "react-router-dom";
// import { get } from "../../utils/api";
// import { useEffect } from "react";

// const AdminPayments = () => {
//   const navigate = useNavigate();
//   const receiptData = {
//     logoUrl: "images/scriptiqlogo2.png",
//     email: "scriptiq.support@company.com",
//     phone: "+91-9876543210",
//     companyName: "SCRIPT IQ",
//     receiptId: "RCPT-20230907-001",
//     date: new Date(),
//     from: "Ranjith Moka",
//     amount: "100",
//     paymentMethod: "Razorpay",
//     purpose: "Story Submission Fee",
//     authorisedBy: "Pavan Kumar",
//   };

//   const handleViewReceipt = () => {
//     navigate("/payment-receipt", { state: receiptData });
//   };
//   useEffect(() => {
//     const fetchAllPayments = async () => {
//       try {
//         const res = await get("/paid");
//         return res.data; // Array of all payments
//       } catch (err) {
//         console.error("Error fetching payments:", err);
//         throw err;
//       }
//     };
//     fetchAllPayments();
//   }, []);
//   return (
//     <div className="p-8">
//       <button
//         onClick={handleViewReceipt}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         View Receipt
//       </button>
//     </div>
//   );
// };

// export default AdminPayments;

import { useNavigate } from "react-router-dom";
import { get } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/endpoints";
import { Avatar, List, Typography } from "antd";
import { colors } from "../../utils/colors";
import Header from "../../components/header";
import { selectCallData } from "../../redux/slices/userdataslice";
const { Text } = Typography;
const AdminPayments = () => {
  const callData = useSelector(selectCallData);
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  // Fetch all payments
  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const res = await get("/paid");

        let payments = res.data;

        // Check user role and filter if needed
        if (callData.user.role === "user") {
          payments = payments.filter(
            (payment) => payment.authorisedBy === callData.user.name
          );

          console.log(payments, callData.user.username);
        }
        setPayments(payments); // Save filtered payments in state
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchAllPayments();
  }, []);

  // Navigate to receipt page
  const handleViewReceipt = (payment) => {
    navigate("/payment-receipt", { state: payment });
  };

  return (
    <>
      <Header />
      <div className="px-0 mt-16 ml-4 md:px-[10%]">
        <div className=" text-xl mb-4 font-semibold text-customPurple">
          Payments List
        </div>

        <List
          itemLayout="horizontal"
          dataSource={payments}
          locale={{
            emptyText:
              callData.user.role === "admin" ||
              callData.user.role === "employee"
                ? "Loading Paid Writers List."
                : "No payments available.",
          }}
          renderItem={(payment) => (
            <List.Item
              className="hover:bg-gray-100 rounded-lg p-2"
              onClick={() => {
                handleViewReceipt(payment);
              }}
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      zIndex: "0",
                      width: "32px",
                      height: "32px",
                      marginTop: "1rem",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <img
                      src={baseUrl + (payment.storyImg || payment.logoUrl)}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fit",
                      }}
                    />
                  </div>
                }
                title={
                  <div style={{ textAlign: "left" }}>
                    <Text
                      strong
                      style={{
                        color: colors.customPurple,
                        textTransform: "uppercase",
                      }}
                    >
                      <strong className="text-customPurple uppercase"></strong>
                      {payment.title}
                    </Text>{" "}
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: colors.customPurple,
                      }}
                    >
                      <p style={{ margin: "4px 0", fontSize: "14px" }}>
                        {payment.from}
                      </p>
                    </Text>
                  </div>
                }
                description={
                  <div style={{ textAlign: "left" }}>
                    Paid 100 through Razorpay{" "}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default AdminPayments;
