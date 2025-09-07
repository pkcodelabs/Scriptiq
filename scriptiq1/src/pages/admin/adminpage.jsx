import React, { useState } from "react";
import { Form, Button, message, Modal, Table } from "antd";
import { employeeFormFields } from "../../forms/reuseform/form";
import { EaszyForm } from "easzy-form";
import { post } from "../../utils/api";
import Header from "../../components/header";

const dummyStories = [
  {
    key: "1",
    title: "The Rise of AI",
    author: "John Doe",
    rating: 18,
    review: "An insightful story about the future of AI.",
  },
  {
    key: "2",
    title: "Mystery of the Old Mansion",
    author: "Jane Smith",
    rating: 15,
    review: "Spooky and thrilling tale with unexpected twists.",
  },
  {
    key: "3",
    title: "Journey to the Stars",
    author: "Elon Star",
    rating: 20,
    review: "A visionary piece about space exploration.",
  },
];

const AdminPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log("Form submitted:", values);

      const res = await post("/employee/create", values);

      message.success(res.data.message || "User created successfully!");

      form.resetFields();
      setModalVisible(false);
    } catch (err) {
      console.error("❌ Error creating employee:", err);

      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error("Something went wrong, please try again.");
      }
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => `${rating}/20 ⭐`,
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
  ];

  return (
    <>
      {" "}
      <div className="p-4 bg-gray-200 mx-auto">
        <Header />

        <h4
          className="mt-10 cursor-pointer text-blue-600 hover:underline"
          onClick={() => setModalVisible(true)}
        >
          Create Employee
        </h4>

        <Modal
          title="Create Employee"
          open={modalVisible}
          footer={null}
          onCancel={() => setModalVisible(false)}
        >
          <EaszyForm form={form} formFields={employeeFormFields} />

          <Form
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={(errorInfo) => {
              console.error("Form validation failed:", errorInfo);
              message.error("Please correct the errors before submitting.");
            }}
            style={{ marginTop: "16px" }}
          >
            <Button
              type="default"
              onClick={() => form.resetFields()}
              style={{ marginRight: "8px" }}
            >
              Clear Fields
            </Button>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
      <h3 className="mt-10 text-xl font-semibold">Story Ratings</h3>
      {/* Desktop Table */}
      <div className="hidden md:block mt-4">
        <Table
          columns={columns}
          dataSource={dummyStories}
          pagination={{ pageSize: 5 }}
        />
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden mt-4 space-y-4">
        {dummyStories.map((story) => (
          <div key={story.key} className="p-4 bg-white rounded-lg shadow">
            <h4 className="text-lg font-bold text-purple-600">{story.title}</h4>
            <p>
              <strong>Author:</strong> {story.author}
            </p>
            <p>
              <strong>Rating:</strong> {story.rating}/20 ⭐
            </p>
            <p className="text-gray-700">{story.review}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPage;
