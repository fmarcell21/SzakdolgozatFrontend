import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']
})
export class MoviedetailComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    
  ) { }
  public isLoaded: boolean = false
  public detail!: Movie; 
  public id: string | undefined

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id']
      console.log(this.id)
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+this.id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {
          this.detail = response
          this.isLoaded = true;
    })
    
    

  }

}
