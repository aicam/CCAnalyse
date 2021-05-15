import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {gatewayAPI} from '../gateway.service';
import {ModalController} from '@ionic/angular';
import {CurrencyModalComponent} from '../currency-modal/currency-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  currenciesInfo: any;
  currenciesInfoLoaded = false;
  selectIntervals = {};
  parseFloatF = parseFloat;
  ccs: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(public gateway: gatewayAPI, private storage: StorageService, public modalController: ModalController) {
  }

  ngOnInit(): void {
    this.storage.init().then(async () => {
      await this.storage.firstInit();
      this.ccs = await this.storage.get();
      this.ccs.map(item => {
        this.selectIntervals[item] = '1';
      });
      this.gateway.get_currenciesPriceInfo(this.ccs).subscribe(data => {
        this.currenciesInfo = JSON.parse(JSON.stringify(data));
        this.currenciesInfoLoaded = true;
      });
    });
  }

  refreshPage() {
    this.gateway.get_currenciesPriceInfo(this.ccs).subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)));
      this.currenciesInfo = JSON.parse(JSON.stringify(data));
      this.currenciesInfoLoaded = true;
    });
  }

  async addCurrency(newCurr: string) {
    this.ccs.push(newCurr);
    this.ccs.map(item => {
      this.selectIntervals[item] = '1';
    });
    this.currenciesInfoLoaded = false;
    await this.storage.set(this.ccs);
    this.refreshPage();
    return 'done';
  }

  async removeCurrency(curr: string) {
    const newCcs = this.ccs.filter((v, i, a) => v !== curr);
    this.ccs = newCcs;
    await this.storage.set(newCcs);
    this.currenciesInfoLoaded = false;
    this.refreshPage();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CurrencyModalComponent,
      componentProps: {
        'ccs': this.ccs,
        'currenciesInfo': this.currenciesInfo,
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.data['new_curr'] != null) {
        this.addCurrency(data.data['new_curr']);
      }
      if (data.data['rm_curr'] != null) {
        this.removeCurrency(data.data['rm_curr']);
      }
    });
    return await modal.present();
  }

}
