const createGroup = (key, label, children) => ({
  key: key,
  label: label,
  type: "group",
  children: children.map((child, index) => ({    
    // parentKey: key,
    // key:  "/" + key + '/' + child.toLowerCase(),
    key: child.toLowerCase(),
    label: child,
  })),
});

const createSub = (key, label, children) => ({
  key,
  label,
  children: children.map((child, index) => ({
    // key: "/" + key + '/' + child.toLowerCase(),
    key: child.toLowerCase(),
    label: child,
    // parentKey: key,
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
