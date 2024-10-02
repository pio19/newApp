import React, { useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CrateNew from "../components/createNew";
import axios from "axios";
import { useList } from "../hooks/useList";
const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => <img src={image} alt="avatar" style={{ width: 50, height: 50 }} />
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"]
  },
];

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {data, onPagination} = useList({resource: 'products'});
  const dataSource = data || [];

console.log(data);


  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       "https://api.escuelajs.co/api/v1/products"
  //     );
  //     setDataSource(response.data);
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API: ", error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const [loading, setLoading] = useState(false);
  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
