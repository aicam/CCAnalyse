import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage-angular';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class StorageService {
  private _storage: Storage | null = null;
  private gKey = 'currencies_selected';

  constructor(private storage: Storage) {
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    // eslint-disable-next-line no-underscore-dangle

    // eslint-disable-next-line no-underscore-dangle
    this._storage = await this.storage.create();

  }

  public async firstInit() {
    const currentCurr = await this.get();
    if (!currentCurr)
      {return await this.set(['BTC', 'ETH']);}
  }

  public async get() {
    // eslint-disable-next-line no-underscore-dangle
    return await this._storage.get(this.gKey);
  }

  public async set(value: any) {
    // eslint-disable-next-line no-underscore-dangle
    return await this._storage.set(this.gKey, value);
  }
}
