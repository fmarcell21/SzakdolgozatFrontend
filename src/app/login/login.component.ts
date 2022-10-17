import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient

  ) { }
  public rMovies!: Movie[]
  public movie!: Movie
  public isLoaded: boolean = false

  ngOnInit(): void {
    this.httpClient.get<any>(' https://api.themoviedb.org/3/movie/top_rated?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe ( 
      response =>{
        this.rMovies = response.results
        let random = Math.floor(Math.random() * this.rMovies.length)
       // let rand = response[~~(Math.random() * this.rMovies.length)]
        //console.log(this.rMovies.length)
        this.movie = this.rMovies[random]
        this.isLoaded = true
      })
  }

}
