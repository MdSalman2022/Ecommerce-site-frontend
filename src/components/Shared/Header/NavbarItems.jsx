const allcategories = [
  {
    id: 1,
    name: "Desktop Components",
    cat: "components",
    subcategories: [
      {
        id: 1,
        name: "Processor",
        subcat: "processor",
        subcategories: [
          {
            id: 1,
            name: "Intel",
            brand: "intel",
          },
          {
            id: 2,
            name: "AMD",
            brand: "amd",
          },
        ],
      },
      {
        id: 2,
        name: "Motherboard",
        subcat: "motherboard",
        subcategories: [
          {
            id: 1,
            name: "Gigabyte",
            brand: "gigabyte",
          },
          {
            id: 2,
            name: "Asus",
            brand: "asus",
          },
          {
            id: 3,
            name: "MSI",
            brand: "msi",
          },
        ],
      },
      {
        id: 3,
        name: "Ram",
        subcat: "ram",
        subcategories: [
          {
            id: 1,
            name: "Corsair",
            brand: "corsair",
          },
          {
            id: 2,
            name: "G.Skill",
            brand: "gskill",
          },
        ],
      },
      {
        id: 4,
        name: "Graphics Card",
        subcat: "graphics-card",
        subcategories: [
          {
            id: 1,
            name: "Asus",
            brand: "asus",
          },
          {
            id: 2,
            name: "Zotac",
            brand: "zotac",
          },
          {
            id: 3,
            name: "Sapphire",
            brand: "sapphire",
          },
        ],
      },
      {
        id: 5,
        name: "Power Supply",
        subcat: "psu",
        subcategories: [
          {
            id: 1,
            name: "Corsair",
            brand: "corsair",
          },
        ],
      },
      {
        id: 6,
        name: "Storage",
        subcat: "storage",
        subcategories: [
          {
            id: 1,
            name: "SSD",
            type: "ssd",
            subcategories: [
              {
                id: 1,
                name: "Samsung",
                brand: "samsung",
              },
            ],
          },
          {
            id: 2,
            name: "HDD",
            type: "hdd",
            subcategories: [
              {
                id: 1,
                name: "Seagate",
                brand: "seagate",
              },
              {
                id: 2,
                name: "Western Digital",
                brand: "wd",
              },
            ],
          },
        ],
      },
      {
        id: 7,
        name: "CPU Cooler",
        subcat: "cooler",
        subcategories: [
          {
            id: 1,
            name: "Corsair",
            brand: "corsair",
          },
        ],
      },
      {
        id: 8,
        name: "Case",
        subcat: "case",
        subcategories: [
          {
            id: 1,
            name: "Lian LI",
            brand: "lianli",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Laptops",
    cat: "laptop",
    subcategories: [
      {
        id: 1,
        name: "Asus",
        brand: "asus",
      },
      {
        id: 2,
        name: "Hp",
        brand: "hp",
      },
      {
        id: 3,
        name: "MSI",
        brand: "msi",
      },
    ],
  },
  {
    id: 3,
    name: "Monitors",
    cat: "monitor",
    subcategories: [
      {
        id: 1,
        name: "Asus",
        brand: "asus",
      },
      {
        id: 2,
        name: "Hp",
        brand: "hp",
      },
      {
        id: 3,
        name: "MSI",
        brand: "msi",
      },
    ],
  },
  {
    id: 4,
    name: "Smartphone",
    cat: "smartphone",
    subcategories: [
      {
        id: 1,
        name: "Samsung",
        brand: "samsung",
      },
      {
        id: 2,
        name: "Apple",
        brand: "apple",
      },
      {
        id: 3,
        name: "Xiaomi",
        brand: "xiaomi",
      },
    ],
  },
  {
    id: 5,
    name: "Tablets",
    cat: "tablet",
    subcategories: [
      {
        id: 1,
        name: "Samsung",
        brand: "samsung",
      },
      {
        id: 2,
        name: "Apple",
        brand: "apple",
      },
    ],
  },
  {
    id: 6,
    name: "Camera",
    cat: "camera",
    subcategories: [
      {
        id: 1,
        name: "Canon",
        brand: "canon",
      },
      {
        id: 2,
        name: "Nikon",
        brand: "nikon",
      },
    ],
  },
  {
    id: 7,
    name: "Consoles",
    cat: "console",
    subcategories: [
      {
        id: 1,
        name: "Playstation",
        brand: "sony",
      },
      {
        id: 2,
        name: "Xbox",
        brand: "microsoft",
      },
    ],
  },
  {
    id: 8,
    name: "TV",
    cat: "tv",
    subcategories: [
      {
        id: 1,
        name: "Xiaomi",
        brand: "xiaomi",
      },
      {
        id: 2,
        name: "Sony",
        brand: "sony",
      },
    ],
  },
  {
    id: 9,
    name: "Accessories",
    cat: "accessories",
    subcategories: [
      {
        id: 1,
        name: "Headphones",
        type: "headphone",
        subcategories: [
          {
            id: 1,
            name: "Logitech",
            brand: "logitech",
          },
        ],
      },
      {
        id: 2,
        name: "Mouse",
        type: "mouse",
        subcategories: [
          {
            id: 1,
            name: "Razer",
            brand: "razer",
          },
        ],
      },
      {
        id: 3,
        name: "Keyboard",
        type: "keyboard",
        subcategories: [
          {
            id: 1,
            name: "Corsair",
            brand: "corsair",
          },
        ],
      },
    ],
  },
];

export { allcategories };
