import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Moment from 'moment';
import { Step } from '../models/step';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moment = Moment;
  search = '';
  charts: any;
  storageKey = 'charts';

  constructor(private router: Router) { }

  ngOnInit() {
    const store = localStorage.getItem(this.storageKey); // Use the storageKey property
    if (store) {
      this.charts = JSON.parse(store);
    } else {
      this.charts = []; // Initialize as empty array if not found in storage
      localStorage.setItem(this.storageKey, JSON.stringify([])); // Set the empty array to storage
    }
  
    // Check if charts is an array before formatting dates
    if (Array.isArray(this.charts)) {
      this.charts.forEach((chart: any) => {
        chart.dates.start = this.moment(chart.dates.start).format('MM/DD');
        chart.dates.end = this.moment(chart.dates.end).format('MM/DD');
      });
    }
  }

  createChart() {
    const start = this.moment().format('YYYY-MM-DD');
    const end = this.moment().add(7, 'days').format('YYYY-MM-DD');
    const chart : any = {
      'name': 'New Project',
      'progress': 0,
      'dates': {
        'start': start,
        'end': end,
      },
      'steps': []
    };
    this.charts.push(chart);
    this.router.navigate(['charts', this.charts.indexOf(chart)]); // navigate to new chart
  }

  deleteChart(i: number) {
    if (confirm('Delete this chart?')) {
      let local : any = localStorage.getItem(this.storageKey)
      const charts = JSON.parse(local);
      charts.splice(i, 1); // remove specific chart from array
      localStorage.setItem(this.storageKey, JSON.stringify(charts)); // save to storage
      this.charts.splice(i, 1); // udpate chart display
    }
  }

}
