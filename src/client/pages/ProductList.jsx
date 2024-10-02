import React from 'react';
import { Row, Col } from 'antd';
import Product from './Product'; // Đảm bảo đúng đường dẫn


const ProductList = ({ products }) => (
  <Row gutter={[16, 16]} justify="space-evenly">
    {products.length > 0 ? (
      products.map((product) => (
        <Col span={6} key={product.id}>
          <Product name={product.name} price={product.price} image={product.image} />
        </Col>
      ))
    ) : (
      <Col span={24}>
        <p>No products available.</p>
      </Col>
    )}
  </Row>
);

export default ProductList;
