import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activatedPage = 1;
  constructor() { }

  ngOnInit(): void {
  }

  activate(page: number){
    this.activatedPage = page;
  }

}
