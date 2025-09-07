// import React, { useEffect } from "react";
// import GeminiSearch from "../../components/gemini";
// import StoryUploader from "../../components/stories";
// import { post } from "../../utils/api"; // ✅ axios helper

// const UserPage = () => {
//   useEffect(() => {
//     const fetchCallme = async () => {
//       try {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         if (!userData?.email) {
//           console.error("❌ No user data found in localStorage");
//           return;
//         }

//         const response = await post("/callme", { email: userData.email });
//         console.log("✅ Callme Response:", response.data);
//       } catch (error) {
//         console.error(
//           "❌ Callme API Error:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchCallme();
//   }, []);

//   return (
//     <>
//       <div>gemini swiper payments server images chats</div>
//       <StoryUploader />
//     </>
//   );
// };

// export default UserPage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeminiSearch from "../../components/gemini";
import StoryUploader from "../../components/stories";
import {
  fetchCallData,
  selectCallData,
  selectCallLoading,
} from "../../redux/slices/userdataslice";

const UserPage = () => {
  const dispatch = useDispatch();
  const callData = useSelector(selectCallData);
  const loading = useSelector(selectCallLoading);
  useEffect(() => {
    // Only fetch if callData is empty
    if (!callData) {
      dispatch(fetchCallData());
    }
  }, [dispatch, callData]);

  return (
    <>
      {loading && <div>Loading...</div>}

      <StoryUploader />
    </>
  );
};

export default UserPage;
