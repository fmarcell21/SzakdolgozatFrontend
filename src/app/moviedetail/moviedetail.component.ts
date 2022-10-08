import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Route, ActivatedRoute } from '@angular/router';
import { Person } from '../model/Person';



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
  public people!: Person[];

  

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
    
    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+this.id+'/credits?api_key='+environment.apiKey+'&language=en-US').subscribe(
      Response => {
        this.people = Response.cast
      }
    )
  

  }

  getUrl(){
    console.log
    return "url('https://image.tmdb.org/t/p/w500" + this.detail.backdrop_path +"')"
  }


}
