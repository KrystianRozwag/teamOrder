import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {PendingRequests} from '../requests/request-interface';
import {TooltipPosition} from '@angular/material/tooltip';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  teamCode = String(localStorage.getItem('teamCode'))
  members: PendingRequests[]=[];
  pendingOrder: any;
  historyOfOrders: any[]=[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getMembers()
    this.getOrders()
  }

  getMembers(){
    this.httpClient.post(`${environment.srvAddress}/show_members`,{teamCode: this.teamCode}).subscribe((data: any)=>{
      for (let i of data.memebers){
        this.members.push(i);
      }
    });
  }

  getOrders(){
    this.httpClient.post(`${environment.srvAddress}/show_orders`,{teamCode: this.teamCode}).subscribe((data: any)=>{
     if(data.pending){
      this.pendingOrder = data.pending;
     }
     if(data.history){
      for (let order of data.history){
        this.historyOfOrders.push(order);
        }
     }
    });
  }

  placeOrder(){
    this.httpClient.post(`${environment.srvAddress}/place_multiple`,{teamCode: this.teamCode}).subscribe((data: any)=>{
      this.getOrders();
     });
  }

  

}
