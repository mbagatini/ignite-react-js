export type User = {
  ref: string;
  data: {
    name: string;
    email: string;
    stripe_customer_id: string;
  };
};
