import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  address = localStorage.getItem("teamAddress");
  name = localStorage.getItem("teamName");
  teamCode = localStorage.getItem("teamCode");
  schedule = {Mon: '', Tue: '', Wed: '', Thu: '', Fri: '', Sat: '', Sun: ''};
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.post(`${environment.srvAddress}/show_schedule`,{teamCode: this.teamCode}).subscribe((data:any)=>{
      this.schedule.Mon = data.schedule.Mon;
      this.schedule.Tue = data.schedule.Tue;
      this.schedule.Wed = data.schedule.Wed;
      this.schedule.Thu = data.schedule.Thu;
      this.schedule.Fri = data.schedule.Fri;
      this.schedule.Sat = data.schedule.Sat;
      this.schedule.Sun = data.schedule.Sun;
    });
  }
  generateSchedule(){
    this.httpClient.post(`${environment.srvAddress}/schedule`,{teamCode: this.teamCode}).subscribe((data:any)=>{
      this.schedule.Mon = data.schedule.Mon;
      this.schedule.Tue = data.schedule.Tue;
      this.schedule.Wed = data.schedule.Wed;
      this.schedule.Thu = data.schedule.Thu;
      this.schedule.Fri = data.schedule.Fri;
      this.schedule.Sat = data.schedule.Sat;
      this.schedule.Sun = data.schedule.Sun;
    });
  }
}
