// app/Apis/Types/OrderType.ts

export interface ShippingAddress {
  details?: string;
  phone?: string;
  city?: string;
  postalCode?: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  category?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  id?: string;
}

export interface OrderCartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface OrderType {
  _id: string;
  id: number;
  user: OrderUser;
  cartItems: OrderCartItem[];
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

// القائمة الكاملة للطلبات
export type AllOrdersType = OrderType[];
