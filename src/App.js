import './App.css';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './pages/Layout';
import Facets from './admin/catalog/Facets';
import Collection from './admin/catalog/Categories';
import Assets from './admin/catalog/Assets';
import ProductList from './admin/pages/products/List';
import ProductCreate from './admin/pages/products/Create';
import { ConfigProvider, Switch, theme } from 'antd';
import { createContext, useState } from 'react';

// const queryClient = new QueryClient();

// export const router = createBrowserRouter([
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/admin",
//     element: <HomeAdmin />,
//   },
//   {
//     path: "/catalog/products",
//     element: <Products />,
//   },
//   {
//     path: "/catalog/products/create",
//     element: <CreateNew />,
//   },
//   {
//     path: "/catalog/facets",
//     element: <Facets />,
//   },
// ]);

// const { Header, Content, Footer, Sider } = Layout;

// const siderStyle = {
//   overflow: "auto",
//   height: "100vh",
//   position: "fixed",
//   insetInlineStart: 0,
//   top: 0,
//   bottom: 0,
//   scrollbarWidth: "thin",
//   scrollbarColor: "unset",
// };

export const ThemeContext = createContext(null);


function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
    localStorage.setItem("theme", checked ? "dark" : "light"); // Lưu chế độ vào localStorage
  };

  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("access_token");   
    if (!token) {
      return <Navigate to="/" />;
    }
  
    return element; 
  };

  return (

    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode: toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login />} />

            {/* <Route path="/admin" element={<AdminLayout isDarkMode={isDarkMode} onChange={toggleTheme} />}> */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="products" />} />
              <Route path="products" element={<ProtectedRoute element={<ProductList />} />} />
              <Route path="create" element={<ProtectedRoute element={<ProductCreate />} />} />
              <Route path="facets" element={<ProtectedRoute element={<Facets />} />} />
              <Route path="collection" element={<ProtectedRoute element={<Collection />} />} />
              <Route path="assets" element={<ProtectedRoute element={<Assets />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
export default App;
