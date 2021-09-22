import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
currentCompany: any;
companyCode: string | null | undefined;
startDate :any;
endDate :any;
stocks: any;
date:Date;
stockPrice: Array<number> = [];
total: number = 0;
arrayLength: number = 0;
average: number = 0;

max: number = 0;
min: number = 0;
  constructor(private companyService: CompanyService,
              private stockService: StockService,
              private route: ActivatedRoute,
              private router: Router,
              private datepipe:DatePipe) {
                this. date=new Date();
                this.endDate =this. datepipe. transform(this. date, 'MM-dd-yyyy');                
                this. date.setMonth(this. date.getMonth() - 1);
                this.startDate =this. datepipe. transform(this. date, 'MM-dd-yyyy');                
               }

  ngOnInit(): void {
    this.companyCode = this.route.snapshot.paramMap.get('companyCode');
    this.getCompany(this.companyCode)
    this.getStock(this.companyCode, this.startDate, this.endDate);
  }
  getCompany(code: any): void {
    this.companyService.readCompany(code).subscribe(
      company=>{
        this.currentCompany = company;
        console.log(this.currentCompany);
      },
      error=>{
        console.error(error);
      }
      
    );
  }
  sum() {
    this.total = this.stockPrice.reduce((a, b) => a + b);
  }
  getStock(code:any,startDate:any, endDate:any): void {
    this.stockService.readStock(code,startDate,endDate).subscribe(
        stocks=>{
          this.stocks = stocks;
          this.stocks.forEach((stock:any) => {
            const datePipe = new DatePipe('en-US');
            let date = new Date(stock.stockDateTime);
            stock.stockDate =datePipe.transform(date,'MM/dd/yyyy');
            stock.stockTime =datePipe.transform(date,'h:mm:ss a');
            this.stockPrice.push(stock.stockPrice);
          });
          this.arrayLength = this.stockPrice.length;
          this.sum();
          if(this.arrayLength>0){
            this.max = this.stockPrice.reduce((a, b) => Math.max(a, b));
            this.min = this.stockPrice.reduce((a, b) => Math.min(a, b));
            this.average = (this.total / this.arrayLength);
          }
          console.log('Max -' + this.max);
          console.log('Min -' + this.min);
          console.log('Avg -' + this.average);
        },
        error=>{
          console.error(error);
          
        }
    );
  }
  searchStock():void{
    console.log(this.startDate);
    console.log(this.endDate);
    this.getStock(this.companyCode, this.startDate, this.endDate);
  }
}
