import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  findCurrencyRate(r030: number, currencies: Currency[]): number | undefined {
    let currency = currencies.find(currency => currency.r030 === r030);
    return currency ? currency.rate : undefined;
  }

  convertCurrencyXToY(amount: number, currencyCodeX: number, currencyCodeY: number, currencies: Currency[]): number {
    let rateXToUAH = this.findCurrencyRate(currencyCodeX, currencies);
    let rateYToUAH = this.findCurrencyRate(currencyCodeY, currencies);

    if (rateXToUAH === undefined || rateYToUAH === undefined) {
      return 0;
    }

    let amountInUAH = amount * rateXToUAH;
    let amountInCurrencyY = amountInUAH / rateYToUAH; 

    return amountInCurrencyY;
  }
}
