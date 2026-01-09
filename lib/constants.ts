
export const categories = [
  {
    id: 1,
    name: "Desktop Components",
    slug: "components",
    icon: "cpu", // Mapped from name
    subcategories: [
      {
        id: 11,
        name: "Processor",
        slug: "processor",
        subcategories: [
             { id: 111, name: "Intel", slug: "intel" },
             { id: 112, name: "AMD", slug: "amd" }
        ]
      },
      {
        id: 12,
        name: "Motherboard",
        slug: "motherboard",
        subcategories: [
            { id: 121, name: "Gigabyte", slug: "gigabyte" },
            { id: 122, name: "Asus", slug: "asus" },
            { id: 123, name: "MSI", slug: "msi" }
        ]
      },
      {
        id: 13,
        name: "RAM",
        slug: "ram",
        subcategories: [
            { id: 131, name: "Corsair", slug: "corsair" },
            { id: 132, name: "G.Skill", slug: "gskill" }
        ]
      },
      {
         id: 14,
         name: "Graphics Card",
         slug: "graphics-card",
         subcategories: [
             { id: 141, name: "Asus", slug: "asus" },
             { id: 142, name: "Zotac", slug: "zotac" },
             { id: 143, name: "Sapphire", slug: "sapphire" }
         ]
      },
      {
          id: 15,
          name: "Power Supply",
          slug: "psu",
          subcategories: [
              { id: 151, name: "Corsair", slug: "corsair" }
          ]
      },
      {
          id: 16,
          name: "Storage",
          slug: "storage",
          subcategories: [
              { id: 161, name: "SSD", slug: "ssd", subcategories: [{id: 1611, name: "Samsung", slug: "samsung"}] },
              { id: 162, name: "HDD", slug: "hdd", subcategories: [{id: 1621, name: "Seagate", slug: "seagate"}, {id: 1622, name: "WD", slug: "wd"}] }
          ]
      },
      { id: 17, name: "CPU Cooler", slug: "cooler", subcategories: [{id: 171, name: "Corsair", slug: "corsair"}] },
      { id: 18, name: "Casing", slug: "case", subcategories: [{id: 181, name: "Lian Li", slug: "lianli"}] },
    ]
  },
  {
    id: 2,
    name: "Laptops",
    slug: "laptop",
    icon: "laptop",
    subcategories: [
      { id: 21, name: "Asus", slug: "asus" },
      { id: 22, name: "HP", slug: "hp" },
      { id: 23, name: "MSI", slug: "msi" }
    ]
  },
  {
    id: 3,
    name: "Monitors",
    slug: "monitor",
    icon: "monitor",
    subcategories: [
      { id: 31, name: "Asus", slug: "asus" },
      { id: 32, name: "HP", slug: "hp" },
      { id: 33, name: "MSI", slug: "msi" }
    ]
  },
  {
    id: 4,
    name: "Smartphone",
    slug: "smartphone",
    icon: "smartphone",
    subcategories: [
      { id: 41, name: "Samsung", slug: "samsung" },
      { id: 42, name: "Apple", slug: "apple" },
      { id: 43, name: "Xiaomi", slug: "xiaomi" }
    ]
  },
  {
    id: 5,
    name: "Tablets",
    slug: "tablet",
    icon: "tablet",
    subcategories: [
      { id: 51, name: "Samsung", slug: "samsung" },
      { id: 52, name: "Apple", slug: "apple" }
    ]
  },
  {
    id: 6,
    name: "Camera",
    slug: "camera",
    icon: "camera",
    subcategories: [
      { id: 61, name: "Canon", slug: "canon" },
      { id: 62, name: "Nikon", slug: "nikon" }
    ]
  },
  {
    id: 7,
    name: "Consoles",
    slug: "console",
    icon: "gamepad",
    subcategories: [
      { id: 71, name: "PlayStation", slug: "sony" },
      { id: 72, name: "Xbox", slug: "microsoft" }
    ]
  },
  {
    id: 8,
    name: "TV",
    slug: "tv",
    icon: "tv",
    subcategories: [
      { id: 81, name: "Xiaomi", slug: "xiaomi" },
      { id: 82, name: "Sony", slug: "sony" }
    ]
  },
  {
    id: 9,
    name: "Accessories",
    slug: "accessories",
    icon: "headphones",
    subcategories: [
      { id: 91, name: "Headphones", slug: "headphone", subcategories: [{id: 911, name: "Logitech", slug: "logitech"}] },
      { id: 92, name: "Mouse", slug: "mouse", subcategories: [{id: 921, name: "Razer", slug: "razer"}] },
      { id: 93, name: "Keyboard", slug: "keyboard", subcategories: [{id: 931, name: "Corsair", slug: "corsair"}] },
    ]
  }
];

export const brandLinks = [
  { name: "Dareu", slug: "dareu" },
  { name: "ThunderRobot", slug: "thunderrobot" },
  { name: "Monka", slug: "monka" },
  { name: "Yeston", slug: "yeston" },
];
