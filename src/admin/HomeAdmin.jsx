import React, { useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Select, theme } from "antd";

import Products from "./Products";
import items from "../components/menuItem";
import options from "../components/Select";
import { router } from "..";
import Facets from "./Facets";
import Collection from "./Collection";

import "../css/HomeAdmin.css";
import { useOne } from "../hooks/useOne";
import { useList } from "../hooks/useList";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

function clickManager() {
  return router.navigate("/admin");
}

const componentsMap = {
  products: Products,
  facets: Facets,
  collection: Collection,
};
const HomeAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data } = useOne("products", 5);
  // console.log(data);
  // const {data: users} = useList('users');

  const [selectedMenu, setSelectedMenu] = useState([]);
  // const [selectComponent, setSelectComponent] = useState();
  const handleMenuClick = (item) => {
    setSelectedMenu(item.key);
    const selectedKey = item.key;
    const parentKey = findParentKey(items, selectedKey);
    // router.navigate(`/${parentKey}/${selectedKey}`);
  };

  const findParentKey = (items, childKey) => {
    for (const item of items) {
      if (item.children) {
        const findChild = item.children.find((child) => child.key === childKey);
        if (findChild) {
          return item.key;
        }
      }
    }
    return null;
  };

  const renderSelectedComponent = () => {
    const SelectedComponent = componentsMap[selectedMenu];
    return SelectedComponent ? <SelectedComponent /> : null;
  };

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div class="manager" onClick={clickManager}>
          <h2>MANAGER</h2>
        </div>

        <div>
          <Menu
            defaultSelectedKeys={[selectedMenu]}
            defaultOpenKeys={["catalog"]}
            mode="inline"
            theme="dark"
            items={items}
            onClick={handleMenuClick}
            selectedKeys={[selectedMenu]}
          />
        </div>
      </Sider>

      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "inherit",
            }}
          >
            <h2>Dashboard</h2>
            <div>
              <Button shape="circle" icon={<BellOutlined />} />
              <Select
                defaultValue="Admin"
                style={{
                  width: 120,
                }}
                // onChange={handleChange}
                options={options}
              />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "auto",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <Products /> */}
            {renderSelectedComponent()}
            {/* {data ? <div>{data.id}: {data.title}</div> : <div>Loading or no data</div>} */}
            {/* {data.map(product => <div >{product.title}</div>)} */}
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HomeAdmin;
