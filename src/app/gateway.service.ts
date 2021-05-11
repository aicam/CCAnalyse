import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class gatewayAPI {
  currenciesPriceInfo = null;

  constructor(public httpClient: HttpClient) {
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public get_currenciesPriceInfo(currencies, reload) {
    const params = new HttpParams().set('key', '')
      .set('ids', currencies.join(','))
      .set('interval', '1d,7d,30d');
    return this.httpClient.get('https://api.nomics.com/v1/currencies/ticker', {
      params
    });
  }
}
