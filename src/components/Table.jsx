import {
  Breadcrumb,
  Button,
  Flex,
  Form,
  Input,
  Layout,
  Pagination,
  Table,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React from "react";
import Search from "antd/es/input/Search";


function CompTable({
  columns,
  dataSource,
  onPagination,
  onSearch,
  createNew,
  value,
}) {
  return (
    <Flex gap="middle" vertical>
      {/* <Flex align="center" justify="flex-end" gap="middle"> */}
      <Flex justify="flex-end" gap="middle">
        <Form
          onFinish={onSearch}
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <Form.Item name="title">
            <Input
              placeholder="Search"
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>
          <Button type="primary" icon={<PlusOutlined />} onClick={createNew}>
            New
          </Button>
        </Form>
        {/* <Input icon={<SearchOutlined />}>Search</Input> */}
      </Flex>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        // loading={loading}
      />
      <Flex align="center" justify="flex-end">
        <Pagination
          defaultCurrent={1}
          total={1000}
          pageSize={10}
          onChange={onPagination}
        />
      </Flex>
    </Flex>
  );
}
export default CompTable;
