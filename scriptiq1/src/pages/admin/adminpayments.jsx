import { useNavigate } from "react-router-dom";

const AdminPayments = () => {
  const navigate = useNavigate();

  const receiptData = {
    logoUrl: "/path-to-logo.png",
    email: "support@company.com",
    phone: "+91-9876543210",
    companyName: "My Awesome Company",
    receiptId: "RCPT-20230907-001",
    date: new Date(),
    from: "Ranjith Moka",
    amount: "1000",
    paymentMethod: "Razorpay",
    purpose: "Story Submission Fee",
    authorisedBy: "Admin Name",
  };

  const handleViewReceipt = () => {
    navigate("/payment-receipt", { state: receiptData });
  };

  return (
    <div className="p-8">
      <button
        onClick={handleViewReceipt}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Receipt
      </button>
    </div>
  );
};

export default AdminPayments;
