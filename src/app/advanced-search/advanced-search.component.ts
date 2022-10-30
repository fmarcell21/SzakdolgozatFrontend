import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  public searchType: string ="0";

  public displayAdv = true
  public searchQuery: string  = ""
 // public region: string  =""
 // public language: string  =""
  public date: number = 0

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  showAdv(){
    if(this.displayAdv === true){
      this.displayAdv = false
    } else {
      this.displayAdv = true
    }
   // console.log(this.searchQuery)
  }

  search(){
    /*console.log(this.searchType)
    console.log(this.searchQuery)
    console.log(this.region)
    console.log(this.language)
    console.log(this.date)*/
    /*if((this.searchQuery.length)!==0){
      if(this.searchType === '0'){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.searchQuery = this.searchQuery.replace(/ /g, '+')
        this.router.navigate(['/search'], {queryParams: {type: 'DEF', query: this.searchQuery, page: 1}})
        this.searchQuery = ''
      } else if(this.searchType==='2'){
        //movie search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AM' ,date: this.date, region: this.region ,query: this.searchQuery, page: 1}})
        //console.log(this.date)
        
      } else if(this.searchType === "3"){
        //people search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AP' ,region: this.region,query: this.searchQuery, page: 1}})
      } else if(this.searchType === "4") {
        //tv search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AT' ,date: this.date, query: this.searchQuery, page: 1}})
      }
    } */

    if((this.searchQuery.length)!==0){
      if(this.searchType === '0'){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.searchQuery = this.searchQuery.replace(/ /g, '+')
        this.router.navigate(['/search'], {queryParams: {type: 'DEF', query: this.searchQuery, page: 1}})
        this.searchQuery = ''
      } else if(this.searchType==='2'){
        //movie search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AM' ,date: this.date,query: this.searchQuery, page: 1}})
        //console.log(this.date)
        
      } else if(this.searchType === "3"){
        //people search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AP' ,query: this.searchQuery, page: 1}})
      } else if(this.searchType === "4") {
        //tv search
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: 'AT' ,date: this.date, query: this.searchQuery, page: 1}})
      }
    }
    

  }
}
