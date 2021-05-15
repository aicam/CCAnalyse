import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../storage.service';
import { Chart, registerables } from 'chart.js';
import {gatewayAPI} from '../gateway.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('barCanvas', {static: true}) barCanvas: ElementRef;
  ccs: any;

  private barChart: Chart;
  constructor(private gateway: gatewayAPI, private storage: StorageService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.storage.init().then(async () => {
      await this.storage.firstInit();
      this.ccs = await this.storage.get();
      this.gateway.get_currenciesSparkline(this.ccs).subscribe(result => {
        console.log(result);
      });
    });
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },

    });
  }

}
