import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useContext, useEffect } from "react";
import { router } from "..";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

function CompMenu(items) {
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

  const {isDarkMode} = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleMenuClick = ({ key }) => {
    console.log(key);
    navigate(key);
  };

  return (
    <Sider style={siderStyle} theme="light">
      <div class="manager">
        <h2 style={{ color: isDarkMode ? "#fff" : "#000" }}>MANAGER</h2>
      </div>

      <div>
        <Menu
          mode="inline"
          items={items.items}
          onClick={handleMenuClick}
          // selectedKeys={[selectedKeys]}
        />
      </div>
    </Sider>
  );
}

export default CompMenu;
