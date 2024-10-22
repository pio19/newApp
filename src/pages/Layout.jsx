import { Outlet } from "react-router-dom";
import { Breadcrumb, ConfigProvider, Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import CompMenu from "../components/Menu";
import CompHeader from "../components/Header";
import items from "../components/menuItem";
// import "../css/Layout.css";
import CompFooter from "../components/Footer";
import { useContext, useState } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

function AdminLayout() {
  
  //  const onChange = (checked) => {
  //   setIsDarkMode(checked);
  //   localStorage.setItem("theme", checked ? "dark" : "light");
  // };

  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const {
    token: { colorBgBase, colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <CompMenu items={items}/>

        <Layout
          style={{
            marginInlineStart: 200,
            overflow: "hidden",
          }}
        >
          <CompHeader  />
          <Content className="content">
            <div
              className="oulet"
              style={{
                border: "#b3b3b3",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer>
            <CompFooter
              style={{
                textAlign: "center",
                width: "100%",
              }}
            />
          </Footer>
        </Layout>
      </Layout>
  );
}

export default AdminLayout;
