import React, { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Table, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CrateNew from "../components/createNew";
import axios from "axios";
import { useList } from "../hooks/useList";
import useDelete from "../hooks/useDelete";
import { deleteItem } from "../base/api";

const Products = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="avatar" style={{ width: 50, height: 50 }} />
      ),
      key: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có muốn xóa sản phẩm này?"
          onConfirm={async () => {
            await deleteRowsById([record.id]);
            message.success("Xóa sản phẩm thành công!");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} loading={loading} />
        </Popconfirm>
      ),
      key: "action",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { data, onPagination } = useList({ resource: "products" });
  const { deleteRowsById, loading } = useDelete(deleteItem);
  const dataSource = data || [];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleteSelectedRows = () => {
    deleteRowsById(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  console.log(selectedRowKeys);
  const hasSelected = selectedRowKeys.length > 0;

  const [showAnotherComponent, setShowAnotherComponent] = useState(false);
  const createNew = () => {
    setShowAnotherComponent(true);
  };
  return !showAnotherComponent ? (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" icon={<PlusOutlined />} onClick={createNew}>
          New Product
        </Button>
        {/* <Modal title="Basic Modal" open={isModalOpen}></Modal> */}
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{total: 100, onChange: onPagination}}
        // loading={loading}
      />
    </Flex>
  ) : (
    <CrateNew />
  );
};

export default Products;
