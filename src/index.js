import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import HomeAdmin from './admin/HomeAdmin';
import Products from './admin/Products';
import Facets from './admin/Facets';
import CreateNew from './components/createNew';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
