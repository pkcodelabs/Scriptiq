import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/endpoints";
import { prompts } from "../utils/prompts";
import { get, post } from "../utils/api";
import Payment from "./payment";
import useGeminiRating from "./gemini";
import { colors } from "../utils/colors";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCallData,
  selectCallData,
  selectCallLoading,
} from "../redux/slices/userdataslice";

import { Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { EaszyForm } from "easzy-form";
import { storyPostFeilds } from "../forms/reuseform/form";
import Header from "./header";
import { MessageOutlined } from "@ant-design/icons";

export default function StoryUploader() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState("india");
  const [allStories, setAllStories] = useState([]); // keep all fetched stories
  const [stories, setStories] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const callData = useSelector(selectCallData);
  const { getRating, isLoading } = useGeminiRating();

  useEffect(() => {
    console.log(callData, "ppppppppppp");
    console.log(callData, "ppppppppppp");
    const fetchStories = async () => {
      try {
        const res = await get("/stories");
        setAllStories(res.data);
        setStories(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchStories();
  }, []);

  const handleFilter = () => {
    const values = form.getFieldsValue(); // get current form values
    const filtered = allStories.filter((s) => {
      const matchesTitle = values.searchTitle
        ? s.title.toLowerCase().includes(values.searchTitle.toLowerCase())
        : true;
      const matchesRating = values.minRating
        ? s.rating >= values.minRating
        : true;
      return matchesTitle && matchesRating;
    });
    setStories(filtered);
  };

  return (
    <div className="p-6  mt-8 mx-auto">
      <Header />

      {/* Filter Form */}
      <EaszyForm
        form={form}
        formFields={[
          {
            name: "searchTitle",
            label: "Search by Title",
            type: "autocomplete",
            customcolour: colors.customPurple,
            options: allStories.map((s) => ({
              label: s.title,
              value: s.title,
            })),
            colSpan: { xs: 24, sm: 12, lg: 12 },
            placeholder: "Type title to search...",
          },
          {
            name: "minRating",
            customcolour: colors.customPurple,
            label: "Minimum Rating",
            type: "select",
            options: Array.from({ length: 21 }, (_, i) => i), // 0 to 20
            colSpan: { xs: 24, sm: 12, lg: 12 },
            placeholder: "Select minimum rating",
          },
        ]}
      />

      <div className="flex gap-4 mt-4">
        <div
          style={{ flexGrow: 2, backgroundColor: colors.customPurple }}
          className="py-2 px-4 rounded-2xl text-white hover:bg-purple-700 cursor-pointer"
          onClick={handleFilter}
        >
          Filter Stories
        </div>

        <div
          style={{ backgroundColor: colors.customPurple }}
          className="py-2 px-4 rounded-2xl text-white hover:bg-purple-700 cursor-pointer"
          onClick={() => navigate("/storypost")}
        >
          Upload Story
        </div>
      </div>

      {/* Stories List */}
      <div className="mt-16">
        <h3 className="text-xl font-semibold text-customPurple mb-3">
          {" "}
          Your Stories
        </h3>
        <div className="space-y-4">
          {stories.map(
            (s, i) =>
              (s?.author?._id === callData?.user?._id ||
                callData?.user?.role === "employee" ||
                callData?.user?.role === "admin") && (
                <div
                  key={i}
                  className="p-4 text-left border rounded-lg bg-white shadow"
                >
                  <div className=" flex">
                    {" "}
                    {s.img && (
                      <>
                        {" "}
                        <div>
                          {" "}
                          <h4 className="text-lg hidden grow-0 lg:flex font-bold text-customPurple  mt-2">
                            {s.title}
                          </h4>
                          <p className=" text-customPurple my-2 lg:flex hidden">
                            Rating:
                            <span className="text-yellow-500">
                              {s.rating}/20
                            </span>{" "}
                            ⭐
                          </p>
                          <p>
                            {(s?.author?._id === callData?.user?._id ||
                              callData?.user?.role === "employee" ||
                              callData?.user?.role === "admin") && (
                              <div
                                onClick={() =>
                                  navigate("/message", { state: s })
                                }
                                className="text-blue-500 lg:flex hidden cursor-pointer "
                              >
                                <MessageOutlined style={{ fontSize: "18px" }} />
                              </div>
                            )}
                          </p>
                        </div>{" "}
                        <img
                          src={`${baseUrl}${s.img}`}
                          alt={s.title}
                          className="w-full max-h-48 object-contain rounded"
                        />
                      </>
                    )}
                  </div>
                  <h4 className="text-lg lg:hidden font-bold text-customPurple  mt-2">
                    {s.title}
                  </h4>
                  <div className="flex justify-between">
                    {" "}
                    <p className=" text-customPurple lg:hidden">
                      Rating:
                      <span className="text-yellow-500">{s.rating}/20</span> ⭐
                    </p>
                    <p>
                      {(s?.author?._id === callData?.user?._id ||
                        callData?.user?.role === "employee" ||
                        callData?.user?.role === "admin") && (
                        <div
                          onClick={() => navigate("/message", { state: s })}
                          className="text-blue-500 lg:hidden cursor-pointer "
                          title="discuss your story"
                        >
                          <MessageOutlined style={{ fontSize: "18px" }} />
                        </div>
                      )}
                    </p>
                  </div>
                  <div
                    className="mt-2 text-gray-700 cursor-pointer line-clamp-5 hover:text-blue-600"
                    onClick={() => navigate("/readscript", { state: s })}
                  >
                    {s.script}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
