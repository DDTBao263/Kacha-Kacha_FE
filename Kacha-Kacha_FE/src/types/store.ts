export type Store = {
  id: number;
  name: string;
  location: string;
  phoneNumber: string;
  status: string;
  storeManager: {
    name: string;
    email: string;
  };
};
