import React, {useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Upload,
} from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const columns = [
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    render: (_text, record) => (
      <Input
        placeholder="SKU"
        value={record.sku}
        // onChange = {handleInputChange}
      />
    ),
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    render: (_number, record) => (
      <InputNumber
        value={record.price}
        addonBefore="US$"
        placeholder="0.00"
        step={0.01}
      />
    ),
  },
  {
    title: "STOCK",
    dataIndex: "stock",
    key: "stock",
    render: (_number, record) => (
      <InputNumber value={record.stock} placeholder="0" />
    ),
  },
];

const data = [
  {
    sku: "",
    price: "",
    stock: "",
  },
];

const CrateNew = () => {
  const [form] = Form.useForm();

  const [products, setProducts] = useState([]);
  /* 
[{name: string, price: number}]
**/
  // const [showOptions, setShowOptions] = useState([]);

  const onAddPoduct = () => {
    const productClone = [...products];
    productClone.push({ key: productClone.length, name: "", price: "" });
    setProducts(productClone);
  };

  const onRemove = (product) => {
    setProducts((productsPrev) => {
      const productClone = productsPrev.filter(
        (productPrev) => productPrev.key !== product.key
      );
      return productClone;
    });
  };

  // const updateProduct = (index, updatedProduct) => {
  //   const updatedProducts = [...products];
  //   updatedProducts[index] = { ...updatedProducts[index], ...updatedProduct };
  //   setProducts(updatedProducts);
  //   console.log(updatedProducts)
  // };

  const [open, setOpen] = useState(false);
  const showAddFacets = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <Form
      form={form}
      scrollToFirstError
      style={{
        paddingBlock: 32,
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      onFinish={console.log}
    >
      <Form.Item>
        <Button type="primary" htmlType="submit" on>
          Create
        </Button>
      </Form.Item>
      <Form.Item name="productname" label="Product name">
        <Input status="error" name="productname" />
      </Form.Item>
      <Form.Item name="slug" label="Slug">
        <Input status="error" name="slug" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={6} name="description" />
      </Form.Item>
      <Form.Item
        label="Assets"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload action="/upload.do" listType="picture-card">
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>

      <Button onClick={onAddPoduct}>
        <PlusOutlined />
        Add Options
      </Button>
      {products.map((product, index) => (
        <Form.Item label="Product variants" name={["options"]}>
          <Product
            key={`product-${index}`}
            onRemove={() => onRemove(product)}
          />{" "}
        </Form.Item>
      ))}

      {/* <Form.Item label="Product variants" name={["options", index]}>
        <Product key={`product-${index}`} onRemove={() => onRemove(product)} />{" "}
      </Form.Item> */}
      {/* <Form.Item name={"customInput"}>
        <CustomInput />
      </Form.Item> */}
      <Form.Item label="Stock ">
        <p>Add stock to location</p>
        <Select defaultValue="Default Stock Location" />
        <Table columns={columns} dataSource={data} />
      </Form.Item>
      <Form.Item label="Visibility">
        <Switch />
      </Form.Item>
      <Form.Item label="Facets">
        <Button icon={<PlusOutlined />} onClick={showAddFacets}>
          Add facets
        </Button>
        <Modal title="Add Facets" open={open} onCancel={handleCancel}>
          <Select
            showSearch
            options={[
              {
                value: "Options1",
                label: "Options1",
              },
              {
                value: "Options2",
                label: "Options2",
              },
            ]}
          />
        </Modal>
      </Form.Item>
    </Form>
  );
};
export default CrateNew;

function Product(props) {
  const {onRemove, onChange } = props;

  const [internalValue, setInternalValue] = useState({ name: "", price: "" });
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    const valuesClone = { ...internalValue };
    valuesClone[name] = value;
    setInternalValue(valuesClone);
    console.log(valuesClone);
    onChange?.(valuesClone);
  };

  return (
    <Space
      style={{ display: "flex", width: "100%" }}
      styles={{ item: { width: "100%" } }}
    >
      <Input
        placeholder="Options"
        label="Options"
        name="name"
        value={internalValue.name}
        onChange={handleChange}
      />
      <Input
        placeholder="Options Value"
        label="Options Value"
        value={internalValue.price}
        name="price"
        onChange={handleChange}
      />

      <Button onClick={onRemove} icon={<DeleteOutlined />}></Button>
    </Space>
  );
}

// function CustomInput({ value, onChange }) {
//   const [val, setVal] = useState("");
//   return (
//     <Space>
//       <Input
//         value={val}
//         onChange={(evt) => {
//           const v = evt.target.value;
//           setVal(v);
//           onChange?.(v);
//         }}
//       />
//     </Space>
//   );
// }
