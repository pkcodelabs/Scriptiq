import React from "react";
import { Form, Button, message } from "antd";
import { EaszyForm } from "easzy-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCallData,
  clearCallData,
} from "../../redux/slices/userdataslice";
import Header from "../../components/header";
import { post } from "../../utils/api";
import { colors } from "../../utils/colors";
import { persistor } from "../../redux/store/store";

const Account = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const callData = useSelector(selectCallData);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearCallData()); // Clear user state in Redux
    persistor.purge().then(() => {
      console.log("Persisted storage purged");
      navigate("/login");
    });
  };

  const handlePasswordChange = async (values) => {
    try {
      console.log("Password change values:", values);

      await post("/user/change-password", {
        email: callData.user.email,
        newPassword: values.password,
      });

      message.success("Password changed successfully!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Failed to change password.");
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      customcolour: colors.customPurple,
      placeholder: "Your Name",
      disabled: true,

      colSpan: { xs: 24, sm: 24, lg: 24 },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      customcolour: colors.customPurple,
      placeholder: "Your Email",
      disabled: true,
      colSpan: { xs: 24, sm: 24, lg: 24 },
    },
    {
      name: "password",
      label: "New Password",
      type: "password",
      customcolour: colors.customPurple,
      placeholder: "Enter new password",
      rules: [{ required: true, message: "Password is required" }],
      colSpan: { xs: 24, sm: 24, lg: 24 },
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      customcolour: colors.customPurple,
      placeholder: "Re-enter new password",
      rules: [
        { required: true, message: "Confirm password is required" },
        {
          validator: (_, value) =>
            value === form.getFieldValue("password")
              ? Promise.resolve()
              : Promise.reject(new Error("Passwords do not match")),
        },
      ],
      colSpan: { xs: 24, sm: 24, lg: 24 },
    },
  ];

  return (
    <>
      <Header />
      <div className="p-6  mt-12 mx-auto">
        <h2 className="text-xl font-semibold text-customPurple mb-4">
          Account Settings
        </h2>

        {/* <EaszyForm form={form} formFields={formFields} onChange={() => {}} /> */}
        <EaszyForm
          form={form}
          formFields={formFields}
          initialValues={{
            name: callData?.user?.username,
            email: callData?.user?.email,
            password: "",
            confirmPassword: "",
          }}
          onFinish={handlePasswordChange}
        />

        <Form
          form={form}
          onFinish={handlePasswordChange}
          style={{ marginTop: "20px" }}
        >
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form>

        <Button type="default" danger onClick={handleLogout} className="mt-6">
          Logout
        </Button>
      </div>
    </>
  );
};

export default Account;
