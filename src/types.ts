export interface AddressFormProps extends FormProps {
  name?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  email?: string;
  phone?: string;
}

export interface WishListProps extends FormProps {
  name?: string;
  interests?: string[];
  products?: Product[];
}

interface Product {
  productName: string;
  price: string;
  storeName: string;
}

interface FormProps {
  onsubmit?: () => void;
  loading?: boolean;
  error?: string;
}
