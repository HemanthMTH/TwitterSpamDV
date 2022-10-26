import { Component } from '@angular/core';
import { ChartType, Row } from "angular-google-charts";
import { Tweet } from './model/tweet.model';
import jsonData from '../assets/tweets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tweets : Tweet[] = [];
  domains: string[] = [];

  title = 'Spam Tweets Distribution';
  type = ChartType.PieChart;
  data : Row[] = [];
  columnNames = ['Domain', 'Number of Tweets'];
  options = {};
  width = 900;
  height = 650;

  constructor(){
    jsonData.forEach(element => {
      this.tweets.push(new Tweet(
        String(element.Id), String(element.UserId), element.Text, element.Domain))
    });
    console.log(this.tweets)
    this.domains = this.tweets.map((data: Tweet) => data.domain);

    [... new Set(this.domains)].forEach(dom => {
      this.data.push([dom, this.domains.filter((t) => t === dom).length])
    });
  }

  onSelect(params: any):void {
    console.log(params)
   }
}
