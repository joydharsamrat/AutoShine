export type TService = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
  featured?: boolean;
};

export type TUser = {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TReview = {
  user: {
    _id: string;
    name: string;
  };
  review: string;
  rating: number;
};
