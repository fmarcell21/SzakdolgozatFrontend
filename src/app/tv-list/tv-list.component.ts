import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from '../model/Show';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
    ) { }

    public ListSort: string ="A"

    public isLoaded = false

    public Details: Show[] = []
    public detail!: Show 


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ListSort = params['view']
      console.log(this.ListSort)
      this.isLoaded = true
     // console.log(this.id)
    })

    if(this.ListSort === "A"){
      this.httpClient.get<any>("http://localhost:8080/api/tv/find/"+ localStorage.getItem("id")).subscribe(
      Response1 => {

        //console.log(Response1)
        for(let i = 0; i <Response1.length; i++){
          //console.log(Response1[i])
          
          this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+Response1[i].movieid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
               response2 => {
               //console.log(response2)
                
                this.Details.push(response2)
                switch (Response1[i].flag){
                  case "P": Object.assign(this.Details[i], {Flag: "Plan to watch"})
                    break
                  case "F": Object.assign(this.Details[i], {Flag: "Watched"})
                    break
                  case "W": Object.assign(this.Details[i], {Flag: "Watching"})
                    break
                  case "D": Object.assign(this.Details[i], {Flag: "Dropped"})
                    break
                  case "H": Object.assign(this.Details[i], {Flag: "On hold"})
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
      this.httpClient.get<any>("http://localhost:8080/api/tv/find/"+ localStorage.getItem("id") + "/flag/"+ this.ListSort).subscribe(
      Response1 => {
          //console.log(Response1)
          for(let i = 0; i <Response1.length; i++){
            //console.log(Response1[i])
            
            this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+Response1[i].movieid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
                 response2 => {
                 // console.log(response2)
                  
                  this.Details.push(response2)
                  switch (Response1[i].flag){
                    case "P": Object.assign(this.Details[i], {Flag: "Plan to watch"})
                      break
                    case "F": Object.assign(this.Details[i], {Flag: "Watched"})
                      break
                    case "W": Object.assign(this.Details[i], {Flag: "Watching"})
                      break
                    case "D": Object.assign(this.Details[i], {Flag: "Dropped"})
                      break
                    case "H": Object.assign(this.Details[i], {Flag: "On hold"})
                      break
                    case "O": Object.assign(this.Details[i], {Flag: "Favourited only"})
                      break
                  }       
                    
              })
  
              
            }
          }       

      
    )
    this.isLoaded = true}

  }
  redirect(path: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/tvlist'],{ queryParams: {view: path}})
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
