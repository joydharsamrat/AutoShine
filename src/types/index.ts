export type TService = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
  featured?: boolean;
};

export type TUserAuth = {
  _id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TReview = {
  createdAt: string;
  user: {
    _id: string;
    name: string;
  };
  review: string;
  rating: number;
};

export type TSlot = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancelled";
  service: TService;
};

export type TCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};

export type TBooking = {
  _id: string;
  customer: TCustomer;
  service: TService;
  slot: TSlot;
};

export interface TUser extends TUserAuth {
  address: string;
  name: string;
  phone: string;
}
export type TMonthlyRevenue = {
  month: string;
  totalRevenue: number;
};
export type TMonthlyBooking = {
  month: string;
  totalBookings: number;
};
