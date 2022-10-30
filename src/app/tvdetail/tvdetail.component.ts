import { Component, OnInit } from '@angular/core';
import { Show } from '../model/Show';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute , Router} from '@angular/router';
import { Person } from '../model/Person';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tvdetail',
  templateUrl: './tvdetail.component.html',
  styleUrls: ['./tvdetail.component.scss']
})
export class TvdetailComponent implements OnInit {

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private modalService: MdbModalService,
    private router: Router,
  ) { }

  public tvStatus: string = 'tvNotWatched';
  public isLoaded: boolean = false
  public detail!: Show;
  public id: string | undefined
  public people!: Person[]
  public running : boolean = false;

  public recommendedLoaded = false
  public RecommendedShows!: Show[];

  public similarShows!: Show[]
  public similarLoaded = false

  public hasCast = false
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'/recommendations?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        this.RecommendedShows = response.results
        //console.log(this.RecommendedMovies)
        if(this.RecommendedShows.length >= 1){
          this.recommendedLoaded = true
        }
      }
    )

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'/similar?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe(
      response => {
        this.similarShows = response.results
        //console.log(this.similarMovies)
        if(this.similarShows.length >= 1){
          this.similarLoaded = true
        }
      }
    )

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
      response => {
        this.detail = response
        if(this.detail.in_production) {
          this.running = true
          console.log(this.running)
        } else {
          console.log(this.running)
        }
        this.isLoaded = true;
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'/credits?api_key='+environment.apiKey+'&language=en-US').subscribe(
      Response => {
        this.people = Response.cast
        if(this.people.length >= 1) {
          this.hasCast=true
        }
      }
    )

      
    
  }

  toNumber(num: string) {
    return Number(num)
  }
  //be kell kérnie egy értéket (ez a meghivó gomb azonosítoja)
  //ha a meghivó gomb az a "watched/not watched" akkor a REST API-nak kell egy post vagy delete parancsot küldenie, és utánna színt váltani
  //esetleg ha a meghívó gomb  az a listához ad, akkor is igazábol ugyan ez, viszont ott más API endpoint
  //vagy annak külön functiont egyszerűbb lenne stb
  //a tvStatus válltozó ngInitnél a REST API-tól kapja meg a kezdő értékét, jelen esetben ez false
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



}
