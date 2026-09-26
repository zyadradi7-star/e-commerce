interface WishlistItem {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  price: number;
  category?: {
    name: string;
  };
}
