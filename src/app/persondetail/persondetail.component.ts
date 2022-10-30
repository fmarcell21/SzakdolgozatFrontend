import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Multi } from '../model/Multi';

import { Person } from '../model/Person';

@Component({
  selector: 'app-persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersondetailComponent implements OnInit {
  public isLoaded = false
  public detail!: Person
  public favStatus: string = 'notFav' 
  public id: string =""

  public credits!: Multi[]
  public creditsLoaded = false

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,    
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']     
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/person/'+this.id+'/combined_credits?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        this.credits = response.cast
        //console.log(this.RecommendedMovies)
        console.log(response)
        if(this.credits.length >= 1){
          this.creditsLoaded = true
        }
      }
    )

    this.httpClient.get<any>('https://api.themoviedb.org/3/person/'+this.id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {
          this.detail = response
          this.isLoaded = true;
          //console.log(response)
    })
  }

  changeColour() {
    if(this.favStatus === 'notFav'){
      this.favStatus = 'Fav'
      
    } else {
      this.favStatus = 'notFav'
      
    } 
    
  }

  onClick(detailId: string, detailType: string){

    if(detailType === "movie"){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/details'], { queryParams: {type: 'M', id: detailId }})
    } else if( detailType === 'tv') {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/details'], { queryParams: {type: 'T', id: detailId }})
    }
    // this.router.navigateByUrl('/details'); ///'+detailType+detailId
    
    // console.log(detailId);
     //console.log(detailType)
    // this.detailservice.setDetail(detailId, detailType)
   }

}
