import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Show } from '../model/Show';
import { environment } from 'src/environments/environment';
import { Season } from '../model/Season';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { EpisodecountComponent } from '../episodecount/episodecount.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})



export class ModalComponent {

  public progressFlag : string ="0"
  public found: boolean  = false
  public isLoaded : boolean = false

  public NumberOfSeasons : string = ""
  public NumberOfEpisodes : string =""
  public Show! : Show
  public Seasons!: Season[]
  public modalType: string = ""
  public tvId: string = ""
  public SelectedSeason: number = 1 //on initben lekéri majd a RESTAPIT-tól hogy benen van e már listában az adott cucc, ha igen akkor ezek kapnak értéket attól függően
  public SelectedEpisode: number = 1

  public dummyarray!: Season
  

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

          this.httpClient.get<any>('http://localhost:8080/api/tv/find/'+localStorage.getItem("id")+"/"+this.tvId).subscribe(
            response => {
              console.log(response[0])
              if((response[0]) !== undefined){
                switch (response[0].flag) {
                  case 'P':
                    this.progressFlag = "1"                    
                    break;
                  case 'F':
                    this.progressFlag = "3"                    
                    break;
                  case 'H':
                      this.progressFlag = "5"                    
                    break;
                  case 'W':
                    this.progressFlag = "2"
                    break;
                  case 'D':
                    this.progressFlag = "4"
                    break;
                }

                this.found = true
                this.SelectedEpisode = response[0].episode_count
                this.SelectedSeason = response[0].season_count
              }
              
            })

         this.NumberOfEpisodes = response.number_of_episodes
         this.NumberOfSeasons = response.number_of_seasons
          
         this.Seasons = response.seasons 
          //console.log(response.seasons)
          
          if(Number(response.seasons[0].season_number) === 0){
            this.isLoaded = true
            
            
          } else {

           //this.Seasons = this.dummyarray.concat(response.seasons)
            this.Seasons.unshift(this.dummyarray)
            
            console.log(this.Seasons)
            this.isLoaded = true
          }
          
        }
      )
      
    } else if(this.modalType === 'M') {
      this.httpClient.get<any>('http://localhost:8080/api/movie/find/'+localStorage.getItem("id")+"/"+this.tvId).subscribe(
        response => {
          //console.log(response[0].flag)
          if((response[0]) !== undefined){
            switch (response[0].flag) {
              case 'P':
                this.progressFlag = "1"
                
                break;
              case 'W':
                this.progressFlag = "2"
                break;
              case 'D':
                this.progressFlag = "4"
                break;
            }
           // console.log(this.found)
            this.found = true;
           // console.log(this.found)
          }
          
        }
      )
      this.isLoaded = true;
    }    
  }
  
  //              "0"Select
 // <option value="1">Plan to watch</option> P
  //<option value="2">Watched</option>   W      
  // On hold 3 F           
  //<option value="4">Dropped</option> D




  toNumber(num: string) {
    return Number(num)
  }

  public setValue(e:Event) {
    
   // console.log(this.Selected)
  }

  /*
  TODO saveProgress() megírása
  Megnézni, hogy amit fel akar venni az lehetséges-e (16 epizódos évadhoz ne legyen 24 az adatbázisban stb)
  Ha nézi a sorozatot, akkor adatb-ból be is töltse a progresst
  */
  saveProgress(type:string) {
    if(type === 'T'){
      console.log(this.progressFlag)
      console.log(this.SelectedSeason)
      console.log(this.SelectedEpisode)




    } else if(type === 'M') {
      //console.log(this.progressFlag)
      var  tempFlag 
      switch (this.progressFlag) {
        case "1":
          tempFlag = "P"
          break
        case "2":
          tempFlag = "W"
          break
        case "4": 
          tempFlag = "D"
      }

      if(this.found !== true){     

        this.handleMovieSaveProgress(tempFlag).subscribe()
        
      } else {

       this.handleMovieUpdateProgress(tempFlag).subscribe()
      }
    }
    
  }

  handleMovieSaveProgress(Flag:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "movid": this.tvId,
      "flag": Flag,
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.post("http://localhost:8080/api/movie/"+localStorage.getItem("id")+"/create",body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress creation failed!");
       throw err;
     })
   )
  }

  handleMovieUpdateProgress(Flag:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "movid": this.tvId,
      "flag": Flag,
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.put("http://localhost:8080/api/movie/updateFlag/"+localStorage.getItem("id"),body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress update failed!");
       throw err;
     })
   )
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
      
      

    