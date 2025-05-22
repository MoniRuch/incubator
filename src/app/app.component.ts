import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as worldMap from '../assets/worldmap.json';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import {EChartsOption} from 'echarts';
import {sentimentData} from '../assets/setimentData';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class AppComponent implements OnInit{
  title = 'geopolitical';

  mapOptions = {};
  constructor() {
  }

  ngOnInit() {
    this.mapFunction();
  }


  mapFunction(): void {
    echarts.registerMap('USA', worldMap as any, {
      Alaska: {
        left: -131,
        top: 25,
        width: 15
      },
      Hawaii: {
        left: -110,
        top: 28,
        width: 5
      },
      'Puerto Rico': {
        left: -76,
        top: 26,
        width: 2
      }
    });
    this.mapOptions = {
      title: {
        text: 'Geo Political Sentiment',
        left: 'right'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 2,
        inRange: {
          color: [
            '#0bdc45',
            '#fee090',
            '#a50026'
          ]
        },
        text: ['Positive', 'Negative', 'Neutral'],
        calculable: true
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'USA PopEstimates',
          type: 'map',
          roam: true,
          map: 'USA',
          emphasis: {
            label: {
              show: true
            }
          },
          data: sentimentData
        }
      ]
    };
  }
}
