import React, { useState } from 'react';
import { Layout } from 'antd';
import HeaderHome from './HeaderHome';
import FooterHome from './FooterHome';
import './css/ClientHome.css';
import ClientHome from './ProductHome';

const { Content, Header } = Layout;

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Computers');
  const [checkedValues, setCheckedValues] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCheckedValues([]); // Reset giá trị checkbox khi đổi danh mục
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <HeaderHome onCategoryChange={handleCategoryChange} />
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px', minHeight: 280 }}>
          <Content style={{ padding: 24, margin: 0, background: '#fff' }}>
            <ClientHome 
              selectedCategory={selectedCategory} 
              checkedValues={checkedValues} 
              setCheckedValues={setCheckedValues} 
            />
          </Content>
        </Layout>
      </Layout>
      <FooterHome />
    </Layout>
  );
};

export default Index;
