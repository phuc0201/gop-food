import { PaymentMethodType } from "../models/payment/payment.model";
import { PaymentMethod } from "../utils/enums/index.enum";


export const PaymentMethodData = [
  new PaymentMethodType('assets/img/icons/dollar.png', 'Cash', PaymentMethod.CASH),
  new PaymentMethodType('assets/img/icons/credit-card.png', 'VNPAY', PaymentMethod.VNPAY),
  new PaymentMethodType('assets/img/icons/wallet.png', 'Wallet', PaymentMethod.GOP_Wallet)
]

