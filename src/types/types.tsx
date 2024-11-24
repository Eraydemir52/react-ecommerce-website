export interface UserType {
  id: string;
  username: string;
  password: string;
  balance: number;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  count?: number;
  image: string;
  rating: RatingType;
}

interface RatingType {
  rate: number;
  count: number;
}
