import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../auth-interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUp = new FormGroup({
    teamName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
    repeatedPassword: new FormControl('',[Validators.minLength(8),Validators.required])
  });

  isSomethingWentWrong: boolean = false;
  passwordNotSatisfying: boolean = false;
  passwordsNotCompliant: boolean = false;

  signUpData: SignUpData ={
    email: '',
    password: '',
    teamName: ''
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  sendData(){
    if( this.signUp.get('password')?.errors){
      this.passwordNotSatisfying = true;
    }else{
      if(this.signUp.value.password == this.signUp.value.repeatedPassword){
        this.signUpData.email = this.signUp.value.email;
        this.signUpData.password = this.signUp.value.password; 
        this.signUpData.teamName = this.signUp.value.teamName;
        this.httpClient.post(`${environment.srvAddress}/signup`,this.signUpData).subscribe((data:any)=>{
          if(data.status != "OK"){
            this.isSomethingWentWrong = true;
          }else{
            this.httpClient.post(`${environment.srvAddress}/schedule`,{teamCode: data.code}).subscribe((data:any)=>{});
            this.router.navigate(['/']);
          }
        });
      }else {
        this.passwordsNotCompliant = true;
      }
    }
  }

}
