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
    public type: string ="T"
    public isLoaded: boolean = true

    public Shows!: Multi[]
    
    public Movies!: Movie[]

    public page: string = "1"
    public pageNum: number = 1
    public query : string = ""
    public totalPages : string = ""
    


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
     // this.type = params['type']
     this.query = params['query']
      this.page = params['page']
      this.pageNum = Number(this.page)
    })

   // if(this.type === "T") {
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
    
    



  }

  public changePage(toPage: string) {
    if(toPage === 'prev' && this.pageNum > 1) {
      //console.log('prev')

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum-1 }})
      this.router.navigate(['/search'], {queryParams: {query: this.query, page: this.pageNum - 1}})
    } else if(toPage === 'next' && (this.pageNum) < (Number(this.totalPages))) {
      //console.log('next')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;      
      //this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
      this.router.navigate(['/search'], {queryParams: {query: this.query, page: this.pageNum + 1}})
    } else if (toPage === 'first') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     // this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
      this.router.navigate(['/search'], {queryParams: {query: this.query, page: 1}})
    } else if (toPage === 'last') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/search'], {queryParams: {query: this.query, page: this.totalPages}})
    }
  }
  redirect(id : string, mtype: string) {
    if (mtype === "tv"){
      this.router.navigate(['/details'], {queryParams: {type: "T", id: id}})
    } else if ( mtype === "movie") {
      this.router.navigate(['/details'], {queryParams: {type: "M", id: id}})
    } else if ( mtype ==='person'){
      this.router.navigate(['/details'], {queryParams: {type: 'P', id: id}})
    }
    
  }
}
