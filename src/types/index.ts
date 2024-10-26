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
  email: string;
  role: string;
  iat: number;
  exp: number;
};
