import { Component, OnInit } from '@angular/core';
import { Show } from '../model/Show';
import { Movie } from '../model/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Multi } from '../model/Multi';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    public type: string ="DEF"
    public isLoaded: boolean = true

    public Shows!: Multi[]
    
    public Movies!: Movie[]

    public page: string = "1"
    public pageNum: number = 1
    public query : string = ""
    public totalPages : string = ""
    
    public displayAdv = true

    public searchType: string = ""
    public region: string  =""
    //public language: string  =""
    public date: string = ''


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      
      this.type = params['type']      
      this.query = params['query']
      this.page = params['page']      
      this.pageNum = Number(this.page)

      if(this.type !== 'DEF') {
        switch(this.type){
          case 'AM': {
            this.date = params['date']
            this.region = params['region']
           // this.language = params['lang']
            break;
          }
          case 'AP': {
            this.region = params['region']
            break;
          }
          case 'AT': {
            this.date = params['date']
            break;
          }
        }
      }
    })

   if(this.type === "DEF") {
      this.httpClient.get<any>('https://api.themoviedb.org/3/search/multi?api_key='+environment.apiKey+'&language=en-US&page='+this.page+'&query='+ this.query +'&include_adult=false').subscribe(
      response => {
        if(response.total_results === 0){
          this.isLoaded = false 
        } else {
          console.log(response)
          this.Shows = response.results
          this.totalPages = response.total_pages
          this.isLoaded = true;
          
        }        
       }) 
   } else {
    switch(this.type){
      case 'AM': {

        if(this.date !==''){
          var year = '&year='+this.date
        } else {
          var year = ''
        }
        
        
        this.httpClient.get<any>('https://api.themoviedb.org/3/search/movie?api_key='+environment.apiKey+'&language=en-US&page='+this.page+'&include_adult=false'+year+'&query='+this.query).subscribe(
        response => {
          if(response.total_results === 0){
            this.isLoaded = false 
          } else {
            
           // console.log(response)
            this.Shows = response.results
            
            this.totalPages = response.total_pages
            this.isLoaded = true;
          }        
        }) 
        
        break;
      }
      case 'AT': {
        if(this.date !==''){
          var year = '&first_air_date_year='+this.date
        } else {
          var year = ''
        }        
        
        this.httpClient.get<any>('https://api.themoviedb.org/3/search/tv?api_key='+environment.apiKey+'&language=en-US&page='+this.page+'&include_adult=false'+year+'&query='+this.query).subscribe(
        response => {
          if(response.total_results === 0){
            this.isLoaded = false 
          } else {
            
           // console.log(response)
            this.Shows = response.results
            
            this.totalPages = response.total_pages
            this.isLoaded = true;
          }        
        }) 

        break;
      }
      case 'AP': {
        this.httpClient.get<any>('https://api.themoviedb.org/3/search/person?api_key='+environment.apiKey+'&language=en-US&page='+this.page+'&include_adult=false&query='+this.query).subscribe(
        response => {
          if(response.total_results === 0){
            this.isLoaded = false 
          } else {            
           // console.log(response)
            this.Shows = response.results
            
            this.totalPages = response.total_pages
            this.isLoaded = true;
          }        
        }) 

        break;
      }
    }
    
   }
    
    



  }

  public changePage(toPage: string) {
    if(this.type==='DEF'){
      if(toPage === 'prev' && this.pageNum > 1) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       // this.router.navigate(['/search'], { queryParams: {type: this.type, page: this.pageNum-1 }})
        this.router.navigate(['/search'], {queryParams: {type: this.type, query: this.query, page: this.pageNum - 1}})
      } else if(toPage === 'next' && (this.pageNum) < (Number(this.totalPages))) {
        //console.log('next')
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;      
        //this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
        this.router.navigate(['/search'], {queryParams: {type: this.type, query: this.query, page: this.pageNum + 1}})
      } else if (toPage === 'first') {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       // this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
        this.router.navigate(['/search'], {queryParams: {type: this.type,query: this.query, page: 1}})
      } else if (toPage === 'last') {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/search'], {queryParams: {type: this.type,query: this.query, page: this.totalPages}})
      }
    } else {
      switch(this.type){
        case 'AM': {
          if(toPage === 'prev' && this.pageNum > 1) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/search'], { queryParams: {type: this.type, page: this.pageNum-1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type, query: this.query, page: this.pageNum - 1}})
          } else if(toPage === 'next' && (this.pageNum) < (Number(this.totalPages))) {
           // console.log(this.Shows)
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;      
            //this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type, query: this.query, page: this.pageNum + 1}})
          } else if (toPage === 'first') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type,query: this.query, page: 1}})
          } else if (toPage === 'last') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type,query: this.query, page: this.totalPages}})
          }

          break;
        }
        case 'AT': {
          if(toPage === 'prev' && this.pageNum > 1) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/search'], { queryParams: {type: this.type, page: this.pageNum-1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type, query: this.query, page: this.pageNum - 1}})
          } else if(toPage === 'next' && (this.pageNum) < (Number(this.totalPages))) {
           // console.log(this.Shows)
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;      
            //this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type, query: this.query, page: this.pageNum + 1}})
          } else if (toPage === 'first') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type,query: this.query, page: 1}})
          } else if (toPage === 'last') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.navigate(['/search'], {queryParams: {date: this.date,type: this.type,query: this.query, page: this.totalPages}})
          }
          
          break;
        }
        case 'AP': {
          if(toPage === 'prev' && this.pageNum > 1) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/search'], { queryParams: {type: this.type, page: this.pageNum-1 }})
            this.router.navigate(['/search'], {queryParams: {type: this.type, query: this.query, page: this.pageNum - 1}})
          } else if(toPage === 'next' && (this.pageNum) < (Number(this.totalPages))) {
            //console.log('next')
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;      
            //this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
            this.router.navigate(['/search'], {queryParams: {type: this.type, query: this.query, page: this.pageNum + 1}})
          } else if (toPage === 'first') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           // this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
            this.router.navigate(['/search'], {queryParams: {type: this.type,query: this.query, page: 1}})
          } else if (toPage === 'last') {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.navigate(['/search'], {queryParams: {type: this.type,query: this.query, page: this.totalPages}})
          }
          break;
        }
      }
    }
    

  }
  redirect(id : string, mtype: string) {
    console.log(id, mtype)
    if (mtype === "tv"){
      this.router.navigate(['/details'], {queryParams: {type: "T", id: id}})
    } else if ( mtype === "movie") {
      this.router.navigate(['/details'], {queryParams: {type: "M", id: id}})
    } else if ( mtype ==='person'){
      this.router.navigate(['/details'], {queryParams: {type: 'P', id: id}})
    }
    
  }


}
