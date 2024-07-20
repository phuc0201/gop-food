import { PaymentMethod } from "../../utils/enums/index.enum";

export class PaymentMethodType {
  image: string;
  name: string;
  value: PaymentMethod;
  constructor(image: string, name: string, value: PaymentMethod) {
    this.image = image;
    this.name = name;
    this.value = value;
  }
}
