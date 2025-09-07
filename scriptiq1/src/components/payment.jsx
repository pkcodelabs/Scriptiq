// import React, { useState } from "react";
// import axios from "axios";

// function Payment() {
//   const [loading, setLoading] = useState(false);
//   const [isPaid, setIsPaid] = useState(false); // 👈 payment status state

//   // Utility: Load Razorpay SDK script dynamically
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const displayRazorpay = async () => {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );
//     if (!res) {
//       alert("Failed to load Razorpay SDK. Please check your internet.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 1. Create order on backend
//       const order = await axios.post(
//         "https://ranjirender.onrender.com/create",
//         {
//           amount: 100000, // ₹1000
//         }
//       );

//       // 2. Razorpay options
//       const options = {
//         key: "rzp_test_6G6Yj3PsY2wyka",
//         amount: order.data.amount,
//         currency: "INR",
//         name: "MOKA RANJITH KUMAR",
//         description: "Fixed ₹1000 Payment",
//         order_id: order.data.id,
//         image:
//           "https://imgs.search.brave.com/8o53S6kB4bwahZFbdP188XLdkpPmvG4rOsX-i5NeUnU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDg4/NTcyNDQxL3Bob3Rv/L2hhbmQtb2YtZ29k/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0xZ1dEcmdsOFN5/WFR2RFJ3SVNHcU9P/MlZrbkJuTi1aOXB5/NXBKT3RzQ2FVPQ",
//         prefill: {
//           name: "Ranjith",
//           email: "ranjith@example.com",
//           contact: "9000090000",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//         handler: function (response) {
//           // 👇 Razorpay sends payment success response here
//           console.log("Payment Success:", response);
//           setIsPaid(true); // ✅ user paid
//         },
//         modal: {
//           ondismiss: function () {
//             // 👇 if user closes popup without paying
//             console.log("Payment popup closed.");
//             setIsPaid(false); // ❌ user did not pay
//           },
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Something went wrong!");
//       setIsPaid(false); // ❌ payment failed
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="App-header">
//         <button onClick={displayRazorpay} disabled={loading}>
//           {loading ? "Processing..." : "Pay ₹1000"}
//         </button>

//         <p>Payment Status: {isPaid ? "✅ User Paid" : "❌ Not Paid"}</p>
//       </div>
//     </div>
//   );
// }

// export default Payment;
import React, { useState } from "react";
import axios from "axios";

function Payment({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create order from backend
      const order = await axios.post(
        "https://ranjirender.onrender.com/create",
        {
          amount: 100000, // ₹1000
        }
      );

      // 2. Razorpay options
      const options = {
        key: "rzp_test_6G6Yj3PsY2wyka",
        amount: order.data.amount,
        currency: "INR",
        name: "MOKA RANJITH KUMAR",
        description: "Fixed ₹1000 Payment",
        order_id: order.data.id,
        handler: function (response) {
          console.log("Payment Success:", response);
          if (onSuccess) onSuccess(); // ✅ call parent success handler
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={displayRazorpay}
      disabled={loading}
      className="bg-customPurple text-white px-4 py-2 rounded hover:bg-green-600"
    >
      {loading ? "Processing..." : "Pay ₹1000"}
    </button>
  );
}

export default Payment;
