import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Movie } from '../model/Movie';
import { Show } from '../model/Show';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

    public type: string =""
    public isLoaded: boolean = true
    public Shows!: Show[]
    public Movies!: Movie[]
    public page: string = "1"
    public pageNum: number = 1

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type']
      this.page = params['page']
      this.pageNum = Number(this.page)
    })

    if(this.type === "T") {
      this.httpClient.get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key='+environment.apiKey+'&language=en-US&page='+this.page).subscribe(
      response => {
        console.log(response)
        this.Shows = response.results
        this.isLoaded = true;
    }) 
    } else if(this.type === "M") {
      this.httpClient.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key='+environment.apiKey+'&language=en-US&page='+this.page).subscribe(
      response => {
        console.log(response)
        this.Movies = response.results
        this.isLoaded = true;
    })
    }
  }


  public changePage(toPage: string) {
    if(toPage === 'prev' && this.pageNum > 1) {
      //console.log('prev')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum-1 }})
    } else if(toPage === 'next') {
      //console.log('next')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/top'], { queryParams: {type: this.type, page: this.pageNum+1 }})
    } else if (toPage === 'first') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/top'], { queryParams: {type: this.type, page: 1 }})
    }
  }

}
