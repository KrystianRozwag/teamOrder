import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PendingRequests } from './request-interface'

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  pendingRequests: PendingRequests[] = [];
  teamCode: any = ''
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.pendingRequests = []
    this.teamCode = localStorage.getItem('teamCode');
    this.httpClient.post(`${environment.srvAddress}/show-requests`,{teamCode: this.teamCode}).subscribe((data: any)=>{
      for (let i of data.requests){
        this.pendingRequests.push(i);
      }
    });
  }

  processRequest( name: any, isConfirmed: boolean, privCode: any){
    this.httpClient.post(`${environment.srvAddress}/process_request`,{name: name,teamCode: this.teamCode, isConfirmed: isConfirmed, privCode: privCode}).subscribe((data: any)=>{
      this.getData()
    });
  }

}
