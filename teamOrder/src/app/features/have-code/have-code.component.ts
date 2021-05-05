import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Products } from './products-interface'

@Component({
  selector: 'app-have-code',
  templateUrl: './have-code.component.html',
  styleUrls: ['./have-code.component.scss']
})
export class HaveCodeComponent implements OnInit {
  privCode = localStorage.getItem('privCode');
  products: any[] = []
  mainProd!: any;
  selectedProd: any;
  isOrderPossible: boolean = true;
  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.httpClient.post(`${environment.srvAddress}/generate_food`,{privCode:this.privCode}).subscribe((data: any) =>{
      for(let prod of data.menu){
          this.products.push(prod);
      }
      console.log(this.products)
      this.mainProd = this.products[0];
      this.selectedProd = this.mainProd._id;
    });
  }

  selectProd(id: string){
    this.selectedProd = id;
  }

  placeOrder(){
    let prd = this.products.find(element => element._id === this.selectedProd)
    this.httpClient.post(`${environment.srvAddress}/place_single`,{product: prd, privCode: this.privCode}).subscribe((data:any)=>{
        if(data.status != "OK"){
            this.isOrderPossible  = false;
        }else{
          this.router.navigate(['/']);
        }
    })
  }

}
