import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Flex, Input, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons";
import CompTable from "../../../components/Table";

import { useList } from "../../../hooks/useList";
import useDelete from "../../../hooks/useDelete";
import { deleteItem } from "../../../base/api";
import { useSearchParams } from "react-router-dom";
import ProductCreate from "./Create";
import AdminLayout from "../../../pages/Layout";

const ProductList = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      defaultSortOrder: "ascend",
    },
    {
      title: "Image",
      dataIndex: "images",
      render: (image) => {
        if (Array.isArray(image) && image.length > 0) {
          const imageUrls = image[0];
          return (
            <img
              src={imageUrls}
              style={{ width: 50, height: 50, marginRight: 5 }}
            />
          );
        } else {
          return <span>No images</span>;
        }
      },
      key: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return category?.name ? category.name : "No Category";
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, valueEdit) => (
        <Flex>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(valueEdit)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(valueEdit.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              loading={loading}
              danger
              style={{ marginLeft: 8 }}
            />
          </Popconfirm>
        </Flex>
      ),
      key: "action",
    },
  ];

  const [editValue, setEditValue] = useState(null);
  const { data, onPagination, refetch, handleSearch } = useList({
    resource: "products",
  });
  const { deleteRowsById, loading } = useDelete(deleteItem);
  const dataSource = data || [];

  const [showAnotherComponent, setShowAnotherComponent] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const isCreate = searchParams.get("isCreate");

    setShowAnotherComponent(
      isCreate === "false" || isCreate === null ? false : true
    );
  }, [searchParams]);

  const createNew = () => {
    setEditValue(null);
    setSearchParams({ isCreate: true });
    setShowAnotherComponent(true);
  };

  const handleEdit = (valueEdit) => {
    setEditValue(valueEdit);
    setSearchParams({ isCreate: true });
  };

  const handleDelete = async (id) => {
    console.log(id);
    const ids = Array.isArray(id) ? id : [id];
    await deleteRowsById(ids);
    message.success("Xóa sản phẩm thành công");
    refetch();
  };

  const crumb = [
    {
      href: "",
      title: (
        <>
          <HomeOutlined />
          <span>Catalog</span>
          
        </>
      ),
    },
    {
      href: "products",
      title: (
        <>
          <UserOutlined />
          <span>Product</span>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{
          padding: "10px",
        }}
        items={crumb}
      />
      {!showAnotherComponent ? (
        <CompTable
          onSearch={handleSearch}
          columns={columns}
          dataSource={dataSource}
          onPagination={onPagination}
          createNew={createNew}
        />
      ) : (
        <ProductCreate
          value={editValue}
          onAfterCreate={() => {
            setShowAnotherComponent(false);
            setSearchParams({ isCreate: false });
            refetch();
          }}
          onBack={() => {
            setShowAnotherComponent(false);
            setSearchParams({ isCreate: false });
          }}
        />
      )}
    </>
  );
};

export default ProductList;
