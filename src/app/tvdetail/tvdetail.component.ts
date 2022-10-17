import { Component, OnInit } from '@angular/core';
import { Show } from '../model/Show';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../model/Person';
import { ActivatedRoute } from '@angular/router';
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
    private modalService: MdbModalService
  ) { }

  public tvStatus: string = 'tvNotWatched';
  public isLoaded: boolean = false
  public detail!: Show;
  public id: string | undefined
  public people!: Person[]
  public running : boolean = false;

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })

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
      }
    )

      
    
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



}
