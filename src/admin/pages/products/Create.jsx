import { Button, Form, Input, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useList } from "../../../hooks/useList";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useCreate } from "../../../hooks/useCreate";
import { useMutation } from "@tanstack/react-query";
import { createItem, updateItem } from "../../../base/api";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../../../components/ImageUpload";

function ProductCreate({ value, onAfterCreate, onBack }) {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const { data: categories } = useList({ resource: "categories" });
  const navigate = useNavigate();

  const { mutate, mutateAsync } = useMutation({
    mutationKey: value ? "update-product" : "create-product",
    mutationFn: (data) =>
      value
        ? updateItem(`/products/${value.id}`, data)
        : createItem("/products", data),
    onSuccess: () => {
      alert(value ? "Cập nhật thành công" : "Thêm mới thành công");
      onAfterCreate();
    },
  });

  const uploadImages = async (files) => {
    const promises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      return axios
        .post("https://api.escuelajs.co/api/v1/files/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data.location);
    });

    return Promise.all(promises);
  };

  const handleBack = () => {
    onBack();
  };

  const onFinish = async (values) => {
    console.log("Form Values: ", values);

    const imageUrls = await uploadImages(selectedImages);

    const updatedValues = {
      ...values,
      categoryId: parseInt(values.categoryId, 10),
      images: imageUrls,
    };

    if (!updatedValues.images.length) {
      alert("No images uploaded");
      return;
    }

    mutate(updatedValues);
  };

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        ...value,
        categoryId: value.category.id,
      });
    }
  }, [value, form]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      scrollToFirstError
      style={{ paddingBlock: 32, textAlign: "center", width: "100%" }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item name="id" label="ID" rules={[{ required: true }]}>
        <Input disabled={!!value} />
      </Form.Item>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={6} />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Select a category">
          {categories?.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Images">
        <ImageUpload
          initialImages={value?.images || []} 
          onImageSelect={setSelectedImages}
        />
      </Form.Item>

      <Form.Item name="" label="">
        <Button
          type="default"
          htmlType="button"
          style={{ margin: 10 }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit">
          {value ? "Update" : "Create"}
        </Button>

        {/* {isError && <div>Error occurred while creating product!</div>} */}
      </Form.Item>
    </Form>
  );
}

export default ProductCreate;
