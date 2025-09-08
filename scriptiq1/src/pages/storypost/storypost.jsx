import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/endpoints";
import { prompts } from "../../utils/prompts";
import { get, post } from "../../utils/api";
import Payment from "../../components/payment";
import useGeminiRating from "../../components/gemini";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCallData,
  selectCallData,
  selectCallLoading,
} from "../../redux/slices/userdataslice";

import { Form, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { EaszyForm } from "easzy-form";
import { storyPostFeilds } from "../../forms/reuseform/form";
import Header from "../../components/header";
export default function StoryPost() {
  const [form] = Form.useForm();
  const [location, setLocation] = useState("india");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const callData = useSelector(selectCallData);
  const { getRating, isLoading } = useGeminiRating();

  const handleStorySave = async (paymentState) => {
    try {
      const values = form.getFieldsValue(); // ✅ get all form values
      console.log("Form Values:", values);

      // 🔹 Generate rating using script text
      const scriptwithprompt =
        " rate script(give stars) by this way " +
        prompts[location] +
        " now the script: " +
        values.script; // ✅ use values.script, not form.script
      const rating = await getRating(scriptwithprompt);
      console.log(scriptwithprompt, rating);
      const res = await post(
        "/stories",
        {
          title: values.scriptTitle,
          genre: values.genre,
          rating: rating,
          script: values.script,
          file: values.storyImage?.[0]?.originFileObj, // <- only the real File
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const story = res.data;
      console.log(story, "storyrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

      const paymentRes = await post(`/payment/${story._id}`, {
        razorpay_order_id: paymentState.razorpay_order_id,
        razorpay_payment_id: paymentState.razorpay_payment_id,
        razorpay_signature: paymentState.razorpay_signature,
        storyId: story._id,
      });

      setStories((prev) => [...prev, res.data]);
      form.resetFields();
    } catch (err) {
      console.error("Error uploading story:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.script || !form.image) return;
  };

  return (
    <div>
      <Header />
      <div className="p-6 mt-8 mx-auto">
        <h2 className="text-2xl font-bold text-customPurple mb-4">
          Upload Story
        </h2>

        <EaszyForm form={form} formFields={storyPostFeilds} />

        <Payment onSuccess={handleStorySave} />
      </div>
    </div>
  );
}
