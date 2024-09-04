import { Variants } from "framer-motion";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export type PrivateRouteProps = {
  allowedRoles: string[];
  element: React.ReactElement;
}
export type GenericResponseType<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type AlertProps = {
  message: string;
  type: boolean;
  onClose: () => void;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  role: string;
  login: (username: string, password: string) => Promise<GenericResponseType<LoginType | null>>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export type RegisterType = {
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string,
}
export type LoginType = {
  userName: string,
  role: string,
  token: string
}

export type TermsType = {
  name: string;
  category: string;
  page: number;
  sortBy: string;
  sortOrder: string;
  minPrice: string;
  maxPrice: string;
  sort: string
};

export type ProductCardProps = {
  item: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    category: string;
  };
  isOpen?: boolean;
  onClose?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  handleClick: (id: string) => void;
};

export type ProductDetailPopupProps = {
  onClose: () => void,
  product: ProductType
}

export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
};

export type ProductsType = ProductType[];

export type CartItems = {
  id: string;
  qty: number;
  amount: number;
  product: ProductType;
};

export type CartType = {
  id: string;
  email: string;
  totalAmount: number;
  cartItems: CartItems[];
};

export type CartPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type CartItemProps = {
  id: string;
  qty: number;
  amount: number;
  product: ProductType;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onDelete: (id: string) => void;
};

export type ScheduleType = {
  startDate: Date,
  endDate: Date
}

export type ProfileType = {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: Date | null;
  address: string | null;
  saldo: number;
  phoneNumber: string;
  gender: string;
  image: string | null;
};

export type EditProfileType = {
  email: string;
  fullName: string;
  dateOfBirth: Date | null;
  address: string | null;
  phoneNumber: string;
  gender: string;
}

export type CategoryCardProps = {
  image: string;
  title: string;
  description: string;
  animation: Variants
}

export type HeaderProps = {
  onOpenPopup: () => void;
}

export type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
}