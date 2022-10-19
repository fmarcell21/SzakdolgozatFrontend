import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Show } from '../model/Show';
import { environment } from 'src/environments/environment';
import { Season } from '../model/Season';

import { EpisodecountComponent } from '../episodecount/episodecount.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})



export class ModalComponent {

  

  public isLoaded : boolean = false

  public NumberOfSeasons : string = ""
  public NumberOfEpisodes : string =""
  public Show! : Show
  public Seasons!: Season[]
  public modalType: string = ""
  public tvId: string = ""
  public Selected: number = 0

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private route: ActivatedRoute,
    private httpClient: HttpClient
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modalType = params['type']
      this.tvId = params['id']
    })
    
    if(this.modalType === 'T'){
      this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.tvId+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {
          this.NumberOfEpisodes = response.number_of_episodes
          this.NumberOfSeasons = response.number_of_seasons
          this.isLoaded = true
          this.Seasons = response.seasons
          console.log(response.seasons)

        }
      )
      
    } else if(this.modalType === 'M') {
      this.isLoaded = true;
    }
    
   
    
  }
  
 /* public updateEpisodeCount(SeasonNum: number){
    console.log(SeasonNum)
    document.getElementById("episodeInput")?.ariaValueMax = 
   Selected = Number(SeasonNum)
    console.log(document.getElementById("seasonInput"))
  }*/
  //A típustól függüen le kell kérdeznie a felhasználó listáját, és ha szerepel benne akkor az adott entry-hez tartozó adatokat, és automatikusan fillelni azokkal a view-t 
  // ha még nem szerepel az adott felhasználó listáján akkor egy "blank" view szerepeljen ahol ki tudja válszatani a listához adást stb....
  // completed (ugyan az mint a checkbox, ez minent a maximumra állít ( ezt a MovieDatabaseAPItól kell majd annak a a gombnak a megnyomásánál lekérni és kitölteni))
  // dropped ( dropped ként flageli meg az entryt, megjegyzi hogy meddig jutott benne stb)
  // plan to watch (ptw flag, üres entry létrehozása, nem kell)
  // ezeknek nem kell külön tábla, csak flagek az entrykhez
}
      
      

    