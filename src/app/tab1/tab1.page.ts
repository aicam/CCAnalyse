import {Component} from '@angular/core';
import {StorageService} from '../storage.service';
import {gatewayAPI} from '../gateway.service';

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(public gateway: gatewayAPI, private storage: StorageService) {
    storage.init().then(async () => {
      await storage.firstInit();
      const ccs = await storage.get();
      console.log('storage: ', ccs);
      ccs.map(item => {
        this.selectIntervals[item] = '1';
      });
      gateway.get_currenciesPriceInfo(ccs, false).then(result => {
        this.currenciesInfo = result;
        this.currenciesInfoLoaded = true;
        console.log(this.currenciesInfo);
      });
    });
  }

}
