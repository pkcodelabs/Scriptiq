import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Card, Typography, Divider, Table } from "antd";

const { Title, Text, Paragraph } = Typography;

// Class Component for Printable Content
class PrintableReceipt extends React.Component {
  render() {
    const {
      logoUrl,
      email,
      phone,
      companyName,
      receiptId,
      date,
      from,
      amount,
      paymentMethod,
      purpose,
      authorisedBy,
    } = this.props.data;

    const columns = [
      { title: "From", dataIndex: "from", key: "from" },
      { title: "Amount", dataIndex: "amount", key: "amount" },
      {
        title: "Payment Method",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
      },
      { title: "For", dataIndex: "purpose", key: "purpose" },
    ];

    const tableData = [
      {
        key: "1",
        from,
        amount: `₹${amount}`,
        paymentMethod,
        purpose,
      },
    ];

    return (
      <div
        style={{
          padding: "20px",
          letterSpacing: "1px",
          background: "#fff",
          color: "#000",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src={logoUrl} alt="Logo" style={{ height: "100px" }} />
          <div style={{ textAlign: "right" }}>
            <Text>{email}</Text>
            <br />
            <Text>{phone}</Text>
          </div>
        </div>

        <div className="py-8 border-t-2">
          <div
            className=" text-center font-bold mb-8 md:mb-6 text-2xl"
            level={3}
          >
            Receipt
          </div>
          <div
            className="   gap-2 md:gap-8  "
            style={{
              display: "grid",

              gridTemplateColumns: "auto auto 1fr", // First two columns fixed size, last column takes remaining space
              textAlign: "left",
              columnGap: "16px",
              rowGap: "16px",
              gap: " ", // space between columns
              alignItems: "start",
            }}
          >
            <div style={{ gridColumn: "1 / 2", flexGrow: 0 }}>
              <Paragraph>
                <div
                  style={{
                    display: "block",

                    marginBottom: "8px",
                  }}
                >
                  {" "}
                  Issued by
                </div>
                <div style={{ display: "block", marginBottom: "8px" }}>
                  {" "}
                  Date
                </div>
                <div style={{ display: "block" }}>Receipt ID</div>
              </Paragraph>
            </div>

            <div style={{ gridColumn: "2 / 3", flexGrow: 0 }}>
              <Paragraph>
                <div style={{ display: "block", marginBottom: "8px" }}>:</div>
                <div style={{ display: "block", marginBottom: "8px" }}>:</div>
                <div style={{ display: "block" }}>:</div>
              </Paragraph>

              {/* You can add additional content here if needed */}
            </div>

            <div style={{ gridColumn: "3 / 4" }}>
              <Paragraph>
                <div style={{ display: "block", marginBottom: "8px" }} strong>
                  {" "}
                  {companyName}{" "}
                </div>

                <div
                  className=" div-sm  "
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {new Date(date).toLocaleString()}
                </div>

                <div style={{ display: "block" }}>{receiptId}</div>
              </Paragraph>
              {/* Additional empty or flexible column */}
            </div>
          </div>

          <div className="block md:hidden space-y-4">
            {tableData.map((item, index) => (
              <div key={index} className=" py-2   rounded bg-white">
                {columns.map((col) => (
                  <div key={col.key} className="flex justify-between mb-2">
                    <span>{col.title}</span>
                    <span className="font-semibold ">
                      {item[col.dataIndex]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Show table only on md+ */}
          <div className="hidden md:block">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              bordered
              style={{ marginTop: "20px", marginBottom: "20px" }}
            />
          </div>

          <div style={{ textAlign: "left", marginTop: "100px" }}>
            <Paragraph>
              Authorised By :{" "}
              <Text strong>
                <span style={{ textAlign: "left" }}>{authorisedBy}</span>
              </Text>
            </Paragraph>
          </div>

          <div style={{ textAlign: "left" }}>
            <Paragraph>
              <span> Signature : </span>

              <span
                style={{
                  display: "inline-block",
                  width: "200px",

                  borderBottom: "1px solid #000",
                }}
              ></span>
            </Paragraph>
          </div>

          <Paragraph
            style={{
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            Thank you for your payment!
          </Paragraph>

          <Paragraph style={{ textAlign: "right" }}>
            <Typography.Link
              href="mailto:scriptiq@gmail.com"
              style={{ color: "#1890ff", textDecoration: "underline" }}
            >
              scriptiq@gmail.com
            </Typography.Link>
          </Paragraph>
        </div>
      </div>
    );
  }
}

// Main Functional Component

import { Navigate, useLocation } from "react-router-dom";
import Header from "../../components/header";

const PaymentReceipt = () => {
  const location = useLocation();
  const receiptData = location.state;
  const contentRef = useRef();

  // Example static data – replace with dynamic receiptData
  // const receiptData = {
  //   logoUrl: "images/scriptiqlogo2.png",
  //   email: "scriptiq.support@company.com",
  //   phone: "+91-9876543210",
  //   companyName: "SCRIPT IQ",
  //   receiptId: "RCPT-20230907-001",
  //   date: new Date(),
  //   from: "Ranjith Moka",
  //   amount: "1000",
  //   paymentMethod: "Razorpay",
  //   purpose: "Story Submission Fee",
  //   authorisedBy: "Pavan Kumar",
  // };

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  if (!receiptData) {
    return <Navigate to="/admin-payments" replace />;
  }
  return (
    <>
      <Header />
      <div className="mt-12" style={{ padding: "20px" }}>
        <Button
          type="primary"
          onClick={handlePrint}
          style={{ marginBottom: "20px" }}
        >
          Print Receipt
        </Button>

        <PrintableReceipt ref={contentRef} data={receiptData} />
      </div>
    </>
  );
};

export default PaymentReceipt;
