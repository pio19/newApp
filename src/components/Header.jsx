import React, { useContext, useState } from "react";
import {
  Layout,
  Button,
  Space,
  message,
  theme,
  Popover,
  Avatar,
  Switch,
  ConfigProvider,
} from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  GlobalOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../base/api";
import { ThemeContext } from "../App";

const { Header } = Layout;

const items = [
  {
    icon: <UserOutlined />,
    key: "profile",
    label: "Profile",
  },
  {
    icon: <GlobalOutlined />,
    key: "language",
    label: "Language",
  },
  {
    icon: <LogoutOutlined />,
    key: "logout",
    label: "Logout",
  },
];

function CompHeader() {
  const navigate = useNavigate();
  const {isDarkMode, setIsDarkMode} = useContext(ThemeContext);

  const handleMenuClick = (e) => {
    console.log(e);

    if (e === "logout") {
      logout();
      message.success("Đăng xuất thành công!");
      navigate("/");
    }
  };
  
  const onChange = (checked) => {
    setIsDarkMode(checked);
  }

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
      <Header
        style={{
          padding: 0,
          background: isDarkMode ? "#000" : "#fff",
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
          <div>
            <h2 style={{ color: isDarkMode ? "#fff" : "#000" }}>DASHBOARD</h2>
          </div>

          <div
            style={{
              display: "flex",
              width: "150px",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Switch
              checked={isDarkMode} 
              onChange={onChange}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />

            <Button size="large" shape="circle" icon={<BellOutlined />} />
            <Popover
              placement="bottomRight"
              content={() => (
                <Space direction="vertical">
                  {items.map((item) => (
                    <div
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#8dcff8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => handleMenuClick(item.key)}
                    >
                      {item.icon} {item.label}
                    </div>
                  ))}
                </Space>
              )}
            >
              <Avatar size="large" src="https://i.pravatar.cc/300" />
            </Popover>
          </div>
        </div>
      </Header>
  );
}

export default CompHeader;
