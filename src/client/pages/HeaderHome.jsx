import { Menu, Input, Button, Layout } from 'antd';
import React, { useState } from 'react';
import PostImagea from '../../components/PostImage';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './css/ClientHome.css'; 

const { Header } = Layout;

const categories = ['Computers', 'Photo', 'Brand'];
const HeaderHome = ({onCategoryChange}) => {
  const [selectedKey,] = useState('Computers');
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <PostImagea
        src={"/images/R.png"}  // Đảm bảo hình ảnh nằm trong thư mục public/images
        alt="My Application Logo"
        style={{ height: '65px', width: '70px', marginRight: '10px' }}
/>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]} // Điều khiển trạng thái chọn của menu
        onClick={(e) => onCategoryChange(e.key)}
        defaultSelectedKeys={['2']}
        style={{ flex: 1, minWidth: 0, paddingLeft: '200px' }}
        className="button-no-background"
      >
        {categories.map(category => (
          <Menu.Item key={category}>
            {category}
          </Menu.Item>
        ))}
      </Menu>

      {/* Search Input */}
      <Input.Search
        placeholder="Search"
        style={{ width: '500px', marginRight: '20px' }}
      />

      {/* Shopping Cart Button */}
      <Button
        type="primary"
        icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />}
        style={{ marginRight: '20px' }}
        
      />

      {/* Login Button */}
      <Button
        type="primary"
        icon={<UserOutlined style={{ fontSize: '24px' }} />}
      />
    </Header>
  );
};

export default HeaderHome;