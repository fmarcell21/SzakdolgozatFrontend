import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Person } from '../model/Person';

import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']

})
export class MoviedetailComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private modalService: MdbModalService,
    private router: Router
    
  ) { }
  public isLoaded: boolean = false
  public detail!: Movie; 
  public id: string | undefined
  public people!: Person[];
  public tvStatus: string = 'tvNotWatched';

  public recommendedLoaded = false
  public RecommendedMovies!: Movie[];

  public similarMovies!: Movie[]
  public similarLoaded = false
 
  openModal(){
    this.modalRef = this.modalService.open(ModalComponent)
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id']
     // console.log(this.id)
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+this.id+'/recommendations?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        this.RecommendedMovies = response.results
        //console.log(this.RecommendedMovies)
        if(this.RecommendedMovies.length >= 1){
          this.recommendedLoaded = true
        }
      }
    )

    this.httpClient.get<any>('https://api.themoviedb.org/3/movie/'+this.id+'/similar?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        this.similarMovies = response.results
        //console.log(this.similarMovies)
        if(this.similarMovies.length >= 1){
          this.similarLoaded = true
        }
      }
    )

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
  changeColour() {
    if(this.tvStatus === 'tvNotWatched'){
      this.tvStatus = 'tvWatched'
      console.log(this.tvStatus)
    } else {
      this.tvStatus = 'tvNotWatched'
      console.log(this.tvStatus)
    } 
    
  }
  onClick(detailId: string, detailType: string){
    // this.router.navigateByUrl('/details'); ///'+detailType+detailId
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/details'], { queryParams: {type: detailType, id: detailId }})
    // console.log(detailId);
     //console.log(detailType)
    // this.detailservice.setDetail(detailId, detailType)
   }
  /*getUrl(){
    console.log
    return "url('https://image.tmdb.org/t/p/w500" + this.detail.backdrop_path +"')"
  }
*/

}
