import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LogInData } from '../auth-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logIn = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  isLoginFailed: boolean = false;

  logInData: LogInData ={
    email: '',
    password: ''
  }
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  sendData(){
    this.logInData.email = this.logIn.value.email;
    this.logInData.password = this.logIn.value.password;
    this.httpClient.post('http://127.0.0.1:5000/login',this.logInData).subscribe((data: any) =>{
      if(data.token!=0){
        localStorage.setItem('session_token', data.token);
        this.router.navigate(["/summary"]);
        localStorage.setItem('user_name', data.email);
        localStorage.setItem('teamName',data.team);
        localStorage.setItem('teamAddress',data.teamAddress);
        localStorage.setItem('teamCode',data.teamCode);
      }else{
        this.isLoginFailed = true;
      } 
    });
  }

}
