import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/endpoints";
import Header from "../../components/header";
import { Button } from "antd";

export default function ReadStory() {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state;

  if (!story) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <Header />
        <h2 className="text-xl font-semibold mt-6">No story to display</h2>
        <div
          className="mt-4 p-2 rounded-xl text-white bg-customPurple"
          onClick={() => navigate("/")}
        >
          Go Back
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Header />

      <h1 className="text-2xl font-bold text-customPurple mt-6">
        {story.title}
      </h1>

      {story.img && (
        <img
          src={`${baseUrl}${story.img}`}
          alt={story.title}
          className="w-full h-64 object-contain rounded mt-4"
        />
      )}

      <p className="mt-6 text-gray-800 text-left whitespace-pre-line">
        {story.script}
      </p>

      <button
        className=" font-bold p-2 rounded-xl text-white bg-customPurple mt-4"
        //  "

        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
