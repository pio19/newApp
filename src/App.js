import HomeAdmin from './admin/HomeAdmin';
import Products from './admin/Products';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import CreateNew from './components/createNew';
import Facets from './admin/Facets';
import { Button, Layout, Menu, Select, theme } from "antd";
import { BellOutlined } from "@ant-design/icons";
import items from "./components/menuItem";
import options from "./components/Select";

// import Login from './pages/Login';

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
  },
  {
    path: "/catalog/products",
    element: <Products />,
    // children: [
    //   {
    //     path: "create",
    //     element: <CreateNew />,
    //   },
    // ],
  },
  {
    path: "/catalog/products/create",
    element: <CreateNew />,
  },
  {
    path: "/catalog/facets",
    element: <Facets />,
  },
]);

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

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div class="manager">
          <h2>MANAGER</h2>
        </div>

        <div>
          <Menu
            // defaultSelectedKeys={[selectedMenu]}
            defaultOpenKeys={["catalog"]}
            mode="inline"
            theme="dark"
            items={items}
            // onClick={handleMenuClick}
            // selectedKeys={[selectedMenu]}
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
          <RouterProvider router={router} />
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
}

export default App;
