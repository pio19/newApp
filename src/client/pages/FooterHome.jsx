import React from 'react';
import { Layout, Row, Col } from 'antd';
// Tùy chỉnh CSS nếu cần

const { Footer } = Layout;

const FooterHome = () => {
  return (
    <Footer style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
      <Row justify="space-between">
        <Col span={8}>
          <h3>About Us</h3>
          <p>We provide high-quality products for your needs. Our commitment is to customer satisfaction.</p>
        </Col>
        <Col span={8}>
          <h3>Contact Us</h3>
          <p>Email: support@example.com</p>
          <p>Phone: +123 456 789</p>
        </Col>
        <Col span={8}>
          <h3>Follow Us</h3>
          <div>
        <h3>Follow Us</h3>
        <a href="https://www.facebook.com" style={{ color: '#fff', marginRight: '10px' }}>Facebook</a>
        <a href="https://www.twitter.com" style={{ color: '#fff', marginRight: '10px' }}>Twitter</a>
        <a href="https://www.instagram.com" style={{ color: '#fff' }}>Instagram</a>
      </div>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        © 2024 Your Company Name. All rights reserved.
      </div>
    </Footer>
  );
};

export default FooterHome;
