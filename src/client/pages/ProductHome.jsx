import React from 'react';
import { Layout, theme, Checkbox, Typography, Breadcrumb } from 'antd';
import './css/ClientHome.css';
import ProductList from './ProductList';

const { Content, Sider } = Layout;
const { Title } = Typography;

const options = {
  'Computers': [
    { label: 'Apple', value: 'Apple' },
    { label: 'Logitech', value: 'Logitech' },
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Corsair', value: 'Corsair' },
  ],
  'Photo': [
    { label: 'Polaroid', value: 'Polaroid' },
    { label: 'Nikkon', value: 'Nikkon' },
  ],
  'Brand': [
    { label: 'Kodak', value: 'Kodak' },
    { label: 'Sony', value: 'Sony' },
  ]
};

const products = {
  'Computers': [
    { id: 1, name: 'Laptop Apple', price: '$1200', image: '/images/R.png', brand: 'Apple' },
    { id: 2, name: 'Headphone Logitech', price: '$150', image: '/images/headphone-logitech.jpg', brand: 'Logitech' },
  ],
  'Photo': [
    { id: 3, name: 'Camera Nikkon', price: '$800', image: '/images/s23-ultra-tim.jpg', brand: 'Nikkon' },
    { id: 4, name: 'Polaroid Camera', price: '$450', image: '/images/polaroid.jpg', brand: 'Polaroid' },
  ],
  'Brand': [
    { id: 5, name: 'Camera Kodak', price: '$350', image: '/images/camera-kodak.jpg', brand: 'Kodak' },
    { id: 6, name: 'Camera Sony', price: '$500', image: '/images/camera-sony.jpg', brand: 'Sony' },
  ]
};

const ClientHome = ({ selectedCategory, checkedValues, setCheckedValues }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleCheckboxChange = (values) => {
    setCheckedValues(values.length > 0 ? [values[0]] : []); // Chỉ cho phép chọn một checkbox
  };

  const currentProducts = products[selectedCategory] || [];
  const filteredProducts = currentProducts.filter(product =>
    checkedValues.length === 0 || checkedValues.includes(product.brand)
  );

  return (
    <Layout>
      <Sider width={240} style={{ background: colorBgContainer }}>
        <div className="sider-content">
          <Title level={5}>{selectedCategory}</Title>
          <Checkbox.Group
            options={options[selectedCategory] || []}
            value={checkedValues}
            onChange={handleCheckboxChange}
            className="checkbox-group"
          />
        </div>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedCategory}</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{ 
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ProductList products={filteredProducts} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClientHome;
