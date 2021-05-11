import {Component} from '@angular/core';
import {StorageService} from '../storage.service';
import {gatewayAPI} from '../gateway.service';
import { ModalController } from '@ionic/angular';
import {CurrencyModalComponent} from '../currency-modal/currency-modal.component';
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
  ccs: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(public gateway: gatewayAPI, private storage: StorageService, public modalController: ModalController) {
    storage.init().then(async () => {
      await storage.firstInit();
      this.ccs = await storage.get();
      console.log('storage: ', this.ccs);
      this.ccs.map(item => {
        this.selectIntervals[item] = '1';
      });
      gateway.get_currenciesPriceInfo(this.ccs, false).subscribe(data => {
        console.log(JSON.parse(JSON.stringify(data)));
        this.currenciesInfo = JSON.parse(JSON.stringify(data));
        this.currenciesInfoLoaded = true;
      });
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CurrencyModalComponent,
      componentProps: {
        'ccs': this.ccs,
        'currenciesInfo': this.currenciesInfo
      }
    });
    return await modal.present();
  }

}
