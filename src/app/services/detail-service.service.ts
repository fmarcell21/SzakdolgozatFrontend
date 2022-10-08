
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/Movie';
import { Show } from '../model/Show';


@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

  public detailID: string | undefined
  public detailType: string | undefined

  constructor(
    private httpClient: HttpClient,
  ) { }

  setDetail(DI: string, DT: string) {
    this.detailID = DI
    this.detailType = DT
  }
  getDetailType() {
    return this.detailType
  }
  getDetailID() {
    return this.detailID
  }

  //https://api.themoviedb.org/3/movie/'+this.detailID+'?api_key=+environment.apiKey+'&language=en-US'

  getDetails(type: string, id: string ):any {
    if(type == 'M') {
      this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {
          let movie: Movie
          movie = response
          console.log(movie)
          return movie
        } 
      ) 
    } else if (type == 'T') {
      this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {
          let show: Show
          show = response
          console.log(show)
          return show
        } 
      )
    } else if (type == 'P') {

    }
  }

}
