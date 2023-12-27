interface AddOrderPayment {
  type: string;
  paymentCode?: string;
  amount: number;
  tax?: number;
  shippingFee?: number;
  total: number;
}

interface AddOrderProducts {
  _id: string;
  unitPrice: number;
  quantity: number;
}

interface AddOrderShipment {
  nameOrderer: string;
  phoneOrderer: string;
  emailOrderer?: string;
  nameReceiver: string;
  phoneReceiver: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  note?: string;
}

export interface AddOrderDetail {
  identityPhone: string;
  orderPayment: AddOrderPayment;
  orderProducts: AddOrderProducts[];
  orderShipment: AddOrderShipment;
  note?: string;
}
