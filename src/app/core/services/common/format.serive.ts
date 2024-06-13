import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatMoney(money: number): string{
    return money.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND"
    })
  }
}
