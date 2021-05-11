import {Component} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {StorageService} from '../storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currenciesInfo: any;
  currenciesInfoLoaded = false;
  selectIntervals = {};
  parseFloatF = parseFloat;
  segmentChanged(ev: any, id: any) {
    this.selectIntervals[id] = ev.detail.value + 'd';
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(public httpClient: HttpClient, private storage: StorageService) {
    storage.init().then(async () => {
      await storage.firstInit();
      const ccs = await storage.get();
      console.log('storage: ', ccs);
    })
    const params = new HttpParams().set('key', '9487a54c570484e6b59716c453c8c3a3')
      .set('ids', 'BTC,ETH')
      .set('interval', '1d,7d,30d');
    this.currenciesInfo = this.httpClient.get('https://api.nomics.com/v1/currencies/ticker', {
      params
    }).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      const js = JSON.parse(JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < js.length; i++) {
        js[i].price = parseFloat(js[i].price).toFixed(1);
        this.selectIntervals[js[i].id] = '1';
      }
      this.currenciesInfo = js;
      this.currenciesInfoLoaded = true;
    });
  }

}
