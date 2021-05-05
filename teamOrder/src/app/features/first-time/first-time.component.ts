import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {PrivCodeData, foodInterface } from './privCode-interface'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.scss']
})
export class FirstTimeComponent implements OnInit {
  dietType = new FormGroup({
    diet: new FormControl('',Validators.required)
  });
  teamCode = new FormGroup({
    code: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required)
  });
  allergics = new FormGroup({
    gluten: new FormControl(false),
    nuts: new FormControl(false),
    lactose: new FormControl(false),
    wheat: new FormControl(false),
    soy: new FormControl(false),
  });
  favouriteFoods = new FormGroup({
    meat: new FormControl(false),
    salads: new FormControl(false),
    pizza: new FormControl(false),
    pasta: new FormControl(false),
    burgers: new FormControl(false),
    sushi: new FormControl(false),
    soups: new FormControl(false),
  });

  currentQuestion: number = 0;
  numberOfFavouriteFoodies: number = 0;
  food: foodInterface[] = [];

  privCodeData: PrivCodeData={
    dietType: '',
    allergics: {
      gluten: false,
      nuts: false,
      lactose: false,
      wheat: false,
      soy: false,
    },
    food: {
      meat: false,
      salads: false,
      pizza: false,
      pasta: false,
      burgers: false,
      sushi: false,
      soups: false
    },
    teamCode: '',
    name: ''
  };
  constructor(private httpClient: HttpClient, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  nextQue(questionNumber: number){
    if(questionNumber==4){
      this.privCodeData.dietType = this.dietType.value.diet;
      this.privCodeData.allergics.gluten = this.allergics.value.gluten;
      this.privCodeData.allergics.nuts = this.allergics.value.nuts;
      this.privCodeData.allergics.lactose = this.allergics.value.lactose;
      this.privCodeData.allergics.wheat = this.allergics.value.wheat;
      this.privCodeData.allergics.soy = this.allergics.value.soy;
      this.privCodeData.food.burgers = this.favouriteFoods.value.burgers;
      this.privCodeData.food.meat = this.favouriteFoods.value.meat;
      this.privCodeData.food.pizza = this.favouriteFoods.value.pizza;
      this.privCodeData.food.pasta = this.favouriteFoods.value.pasta;
      this.privCodeData.food.sushi = this.favouriteFoods.value.sushi;
      this.privCodeData.food.soups = this.favouriteFoods.value.soups;
      this.privCodeData.food.salads = this.favouriteFoods.value.salads;
      this.privCodeData.teamCode = this.teamCode.value.code;
      this.privCodeData.name = this.teamCode.value.name;
      console.log(this.privCodeData)
      this.httpClient.post(`${environment.srvAddress}/generate`,this.privCodeData).subscribe((data: any) =>{
        let dialogRef = this.dialog.open( DialogData,{
          height: '400px',
          width: '600px',
          data: data.privCode
        });
      });
    }else{
      this.currentQuestion += 1;
    }
  }
  toggleQuestions(questionNumber: number){
    this.currentQuestion = questionNumber;
  }
  addNewFavFood(){
    let foodName = this.favouriteFoods.value.name;
    this.food.push({name: foodName})
    this.numberOfFavouriteFoodies += 1;
  }


}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'privCode-dialog.html',
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public prvCode: string,private dialogRef: MatDialogRef<FirstTimeComponent>) {}
  Close(){
      this.dialogRef.close();
  }
}
