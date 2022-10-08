import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/Movie';
import { Show } from '../model/Show';
import { Router } from '@angular/router';

import { DetailServiceService } from '../services/detail-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})





export class HomeComponent implements OnInit {

  public Movies: Movie[] = [];
  public Shows: Show[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private detailservice: DetailServiceService
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getShows();
   
  }

  getMovies(){
    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/popular?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        
        this.Movies = response.results;
       // console.log(this.Movies);
      }
    )
  }
  getShows(){
    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/popular?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        
        this.Shows = response.results;
      //  console.log(this.Shows);
      }
    )
  }
  onClick(detailId: string, detailType: string){
   // this.router.navigateByUrl('/details'); ///'+detailType+detailId
   this.router.navigate(['/details'], { queryParams: {type: detailType, id: detailId }})
   // console.log(detailId);
    //console.log(detailType)
   // this.detailservice.setDetail(detailId, detailType)
  }

}
