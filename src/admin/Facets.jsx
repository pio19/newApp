import React, { useState } from "react";
import { Button, Flex, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Id",
    dataIndex: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Imaage",
    dataIndex: "iamge",
  },
];
const dataSource = Array.from({
  length: 20,
}).map((_, i) => ({
  key: (i = i + 1),
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
const Facets = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
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
      />
    </Flex>
  );
};

export default Facets;
