export type SearchType = {
  name: string;
  category: string;
  page: number;
  sortBy: string;
  sortOrder: string;
  minPrice: string;
  maxPrice: string;
};

export interface ProductCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    category: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
};
export type ProductsType = Product[];

export const getAllProducts = async (
  search: SearchType
): Promise<ProductsType> => {
  const response = await fetch(
    `http://localhost:8080/products/get-all-products?page=${search.page}&name=${search.name}&category=${search.category}&sortBy=${search.sortBy}&sortOrder=${search.sortOrder}&minPrice=${search.minPrice}&maxPrice=${search.maxPrice}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const res = await response.json();
  return res.data.items as ProductsType;
};

export const productsTest = [
  {
    id: "1",
    name: "Yamaha FS400C",
    price: 1911000,
    stock: 10,
    description: "Akustik",
    image: "https://id.yamaha.com/id/files/Image-Index_FS400C_1080x1080_933234c26338b2919d7758bd4ec7b6b2.jpg?impolicy=resize&imwid=735&imhei=735",
    category: "Akustik",
  },
  {
    id: '2',
    name: "Yamaha FS400C",
    price: 1911000,
    stock: 10,
    description: "Akustik",
    image: "https://id.yamaha.com/id/files/Image-Index_FS400C_1080x1080_933234c26338b2919d7758bd4ec7b6b2.jpg?impolicy=resize&imwid=735&imhei=735",
    category: "Akustik",
  },
  {
    id: '3',
    name: "Yamaha FS400C",
    price: 1911000,
    stock: 10,
    description: "Akustik",
    image: "https://id.yamaha.com/id/files/Image-Index_FS400C_1080x1080_933234c26338b2919d7758bd4ec7b6b2.jpg?impolicy=resize&imwid=735&imhei=735",
    category: "Akustik",
  },
  {
    id: '4',
    name: "Yamaha FS400C",
    price: 1911000,
    stock: 10,
    description: "Akustik",
    image: "https://id.yamaha.com/id/files/Image-Index_FS400C_1080x1080_933234c26338b2919d7758bd4ec7b6b2.jpg?impolicy=resize&imwid=735&imhei=735",
    category: "Akustik",
  },
];
