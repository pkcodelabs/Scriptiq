// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { baseUrl, endpoints } from "../utils/endpoints";
// import Payment from "./payment";

// export default function StoryUploader() {
//   const [stories, setStories] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     rating: "",
//     script: "",
//     image: null,
//   });

//   // ✅ Fetch all stories on mount
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const res = await axios.get(baseUrl + "/stories");
//         setStories(res.data);
//       } catch (err) {
//         console.error(
//           "Error fetching stories:",
//           err.response?.data || err.message
//         );
//       }
//     };

//     fetchStories();
//   }, []); // runs once on mount

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handle image upload
//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, image: file });
//     }
//   };

//   // Submit story
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title || !form.rating || !form.script || !form.image) return;

//     try {
//       const formData = new FormData();
//       formData.append("title", form.title);
//       formData.append("rating", form.rating);
//       formData.append("script", form.script);
//       formData.append("file", form.image);

//       const token = localStorage.getItem("token"); // ✅ get saved JWT

//       const res = await axios.post(baseUrl + "/stories", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`, // ✅ send token
//         },
//       });

//       setStories((prev) => [...prev, res.data]); // ✅ append new story
//       setForm({ title: "", rating: "", script: "", image: null });
//     } catch (err) {
//       console.error(
//         "Error uploading story:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Upload Story</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 bg-gray-100 p-4 rounded-xl shadow"
//       >
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Story Title"
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="rating"
//           value={form.rating}
//           onChange={handleChange}
//           placeholder="Rating (1-10)"
//           className="w-full border p-2 rounded"
//           min="1"
//           max="10"
//         />
//         <textarea
//           name="script"
//           value={form.script}
//           onChange={handleChange}
//           placeholder="Write story script..."
//           rows="4"
//           className="w-full border p-2 rounded"
//         ></textarea>
//         <input type="file" accept="image/*" onChange={handleImage} />
//         {form.image && (
//           <p className="text-sm text-gray-600 mt-1">
//             Selected: {form.image.name}
//           </p>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Story
//         </button>
//       </form>

//       {/* Story Feed */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-3">Stories</h3>
//         <div className="space-y-4">
//           {stories.map((s, i) => (
//             <div key={i} className="p-4 border rounded-lg bg-white shadow">
//               {s.img && (
//                 <img
//                   src={`${baseUrl}${s.img}`} // ✅ fixed path
//                   alt={s.title}
//                   className="w-full h-48 object-cover rounded"
//                 />
//               )}
//               <h4 className="text-lg font-bold mt-2">{s.title}</h4>
//               <p className="text-sm text-gray-500">⭐ Rating: {s.rating}/10</p>
//               <p className="mt-2">{s.script}</p>

//               <Payment />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/endpoints";
import Payment from "./payment";
import useGeminiRating from "./gemini";

export default function StoryUploader() {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    script: "",
    image: null,
  });

  const { getRating, isLoading } = useGeminiRating();

  // ✅ Fetch all stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get(baseUrl + "/stories");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching stories:", err.message);
      }
    };
    fetchStories();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setForm({ ...form, image: file });
  };

  // Called only after payment is successful
  const handleStorySave = async () => {
    try {
      // 🔥 Get AI rating
      const rating = await getRating(form.script);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("rating", rating);
      formData.append("script", form.script);
      formData.append("file", form.image);

      const token = localStorage.getItem("token");

      const res = await axios.post(baseUrl + "/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setStories((prev) => [...prev, res.data]);
      setForm({ title: "", script: "", image: null });
    } catch (err) {
      console.error("Error uploading story:", err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.script || !form.image) return;
    // Instead of saving now → trigger Payment first
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Story</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded-xl shadow"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Story Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="script"
          value={form.script}
          onChange={handleChange}
          placeholder="Write story script..."
          rows="4"
          className="w-full border p-2 rounded"
        ></textarea>

        {/* <input type="file" accept="image/*" onChange={handleImage} /> */}
        {form.image && (
          <p className="text-sm text-gray-600 mt-1">
            Selected: {form.image.name}
          </p>
        )}

        {/* 🚀 Payment first, then save story */}
        <Payment onSuccess={handleStorySave} />
      </form>

      {/* Story Feed */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Stories</h3>
        <div className="space-y-4">
          {stories.map((s, i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow">
              {s.img && (
                <img
                  src={`${baseUrl}${s.img}`}
                  alt={s.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h4 className="text-lg font-bold mt-2">{s.title}</h4>
              <p className="text-sm text-gray-500">⭐ Rating: {s.rating}/10</p>
              <p className="mt-2">{s.script}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
