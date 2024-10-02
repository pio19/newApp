import React, { useEffect ,useState } from "react";
import { Button, Flex, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="avatar" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
];

const Collection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setDataSource(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;


  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" icon={<PlusOutlined />}>
          New Product
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />
    </Flex>
  );
};

export default Collection;
