import { Component } from '@angular/core';
import { CurrencyRateServiceService } from './services/currency-rate-service.service';
import { Currency } from './models/currency.model';
import { ConverterService } from './services/converter.service';
import { CurrencyCodeName } from './models/currency-code-name.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CurrencyConverter';
  currencyData: Currency[] = [];
  currencyUSD?: Currency;
  currencyEUR?: Currency;
  uniqueCodes: number[] = [];
  currencCodesDictionary: CurrencyCodeName[] = [];
  selectedCurrencyFrom: number = 840;
  selectedCurrencyTo: number = 978;
  valueFrom: number = 0;
  valueTo: number = 0;
  UAH: Currency = {
    r030: 980,
    txt: "Гривня",
    rate: 1,
    cc: "UAH",
    exchangedate: new Date()
  }

  constructor(private currencyRateService: CurrencyRateServiceService, private converter: ConverterService) { }

  ngOnInit(): void {
    this.GetActualCurrency();
  }

  GetActualCurrency() {
    this.currencyRateService.GetCurrency().subscribe({
      next: res => {
        this.currencyData = res;
        this.currencyUSD = this.currencyData.find(x => x.r030 == 840);
        this.currencyEUR = this.currencyData.find(x => x.r030 == 978);
        this.currencyData.push(this.UAH);
        this.currencCodesDictionary = this.GetCurrencyCodes(this.currencyData);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  GetCurrencyCodes(data: Currency[]) {
    return data.map(currency => ({
      r030: currency.r030,
      cc: currency.cc
    }));
  }

  ConvertCurrency(from: number, to: number, amount: number, reverse: boolean) {
    if (!reverse) {
      this.valueTo = this.converter.convertCurrencyXToY(amount, Number(from), Number(to), this.currencyData);
    } else {
      this.valueFrom = this.converter.convertCurrencyXToY(amount, Number(from), Number(to), this.currencyData);
    }
    this.valueTo = Number(this.valueTo.toFixed(2));
    this.valueFrom = Number(this.valueFrom.toFixed(2));
  }
}


