// import {
//   ProductOutlined,
//   TagOutlined,
//   FolderOpenOutlined,
//   FileImageOutlined,
//   TeamOutlined,
//   UserOutlined,
//   ShoppingCartOutlined,
//   MoneyCollectOutlined,
// } from "@ant-design/icons";
// import Products from "../admin/Products";
// import Facets from "../admin/Facets";
// import Collection from "../admin/Collection";

// function getIconByIndex(index) {
//   const icons = [
//     ProductOutlined,
//     TagOutlined,
//     FolderOpenOutlined,
//     FileImageOutlined,
//     ShoppingCartOutlined,
//     UserOutlined,
//     TeamOutlined,
//     MoneyCollectOutlined,
//   ];
//   return icons[index];
// }

// const componentsMap = {
//   "products": Products,
//   "facets": Facets,
//   "collection": Collection,
// };

const createGroup = (key, label, children) => ({
  key: key,
  label: label,
  type: "group",
  children: children.map((child, index) => ({
    // key: `${index + 1}`,
    key: child.toLowerCase(),
    label: child,
    parentKey: key,
  })),
});

const createSub = (key, label, children) => ({
  key,
  label,
  children: children.map((child, index) => ({
    // key: `${index + 1}`,
    key: child.toLowerCase(),
    label: child,
    parentKey: key,
  })),
});

const items = [
  createGroup("catalog", "Catalog", [
    "Products",
    "Facets",
    "Collection",
    "Assets",
  ]),
  createGroup("sales", "Sales",  ["Orders"]),
  createGroup("customers", "Customers", ["Customers", "Customer groups"]),
  createGroup("marketing", "Marketing", ["Promotions"]),
  createSub("settings", "Settings", [
    "Seller",
    "Channels",
    "Stock locations",
    "Administrators",
    "Roles",
    "Shipping methods",
    "Payment methods",
    "Tax categories",
    "Tax rates",
    "Countries",
    "Zones",
    "Global settings",
  ]),
  createSub("system", "System", [
    "Job queue",
    "System status",
  ]),


];


export default items;
