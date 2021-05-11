import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class gatewayAPI {
  currenciesPriceInfo = null;

  constructor(public httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public async get_currenciesPriceInfo(currencies, reload) {
    if (this.currenciesPriceInfo == null || reload) {
      const params = new HttpParams().set('key', '')
        .set('ids', currencies.join(','))
        .set('interval', '1d,7d,30d');
      this.httpClient.get('https://api.nomics.com/v1/currencies/ticker', {
        params
      }).subscribe(data => {
        console.log(JSON.parse(JSON.stringify(data)));
        const js = JSON.parse(JSON.stringify(data));
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < js.length; i++) {
          js[i].price = parseFloat(js[i].price).toFixed(1);
        }
        this.currenciesPriceInfo = js;
        return js;
      });
    } else {
      return this.currenciesPriceInfo;
    }
  }
}
