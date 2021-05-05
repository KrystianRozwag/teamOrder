import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  privCode = new FormGroup({
    code: new FormControl('',Validators.required)
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  submitCode(){
    localStorage.setItem('privCode',this.privCode.value.code);
    this.router.navigate(['/have-code']);
   }

}
