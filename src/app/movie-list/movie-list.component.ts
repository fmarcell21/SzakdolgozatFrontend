import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../model/Movie';
import { HttpClient } from '@angular/common/http';
import { MovieProgress } from '../model/MovieProgress';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,

  ) { }
  public ListSort: string ="A"
  public MList!: MovieProgress[]
  public Details: Movie[] = []
  public detail!: Movie 
  public isLoaded = false
  //todo: REST API-tól, a view értékének megfelelően intézi a lekérést ('A' mindent lekér a listában stb stb stb)

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ListSort = params['view']
      console.log(this.ListSort)
     
     // console.log(this.id)
    })

    if(this.ListSort === "A"){
      this.httpClient.get<any>("http://localhost:8080/api/movie/find/"+ localStorage.getItem("id")).subscribe(
      Response1 => {

        //console.log(Response1)
        for(let i = 0; i <Response1.length; i++){
          //console.log(Response1[i])
          
          this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+Response1[i].movieid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
               response2 => {
               // console.log(response2)
                
                this.Details.push(response2)
                switch (Response1[i].flag){
                  case "P": Object.assign(this.Details[i], {Flag: "Plan to watch"})
                    break
                  case "W": Object.assign(this.Details[i], {Flag: "Watched"})
                    break
                  case "D": Object.assign(this.Details[i], {Flag: "Dropped"})
                    break
                  case "O": Object.assign(this.Details[i], {Flag: "Favourited only"})
                    break
                }       
                  
            })

            
          }
        }       
      )
      this.isLoaded = true
    } else {
      this.httpClient.get<any>("http://localhost:8080/api/movie/find/"+ localStorage.getItem("id") + "/flag/"+ this.ListSort).subscribe(
      Response1 => {
          //console.log(Response1)
          for(let i = 0; i <Response1.length; i++){
            //console.log(Response1[i])
            
            this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+Response1[i].movieid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
                 response2 => {
                 // console.log(response2)
                  
                  this.Details.push(response2)
                  switch (Response1[i].flag){
                    case "P": Object.assign(this.Details[i], {Flag: "Plan to watch"})
                      break
                    case "W": Object.assign(this.Details[i], {Flag: "Watched"})
                      break
                    case "D": Object.assign(this.Details[i], {Flag: "Dropped"})
                      break
                    
                  }       
                    
              })
  
              
            }
          }       

      
    )
    this.isLoaded = true}
    
    
      console.log(this.Details)


  }

  redirect(path: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/movielist'],{ queryParams: {view: path}})
  }
  
  onClick(detailId: string, detailType: string){
    // this.router.navigateByUrl('/details'); ///'+detailType+detailId
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/details'], { queryParams: {type: detailType, id: detailId }})
    // console.log(detailId);
     //console.log(detailType)
    // this.detailservice.setDetail(detailId, detailType)
   }
}
