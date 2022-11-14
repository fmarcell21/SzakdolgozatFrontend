import { Component, OnInit } from '@angular/core';
import { MdbModalRef,MdbModalService} from 'mdb-angular-ui-kit/modal';
import { ActivatedRoute } from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { Show } from '../model/Show';
import { environment } from 'src/environments/environment';
import { Season } from '../model/Season';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { EpisodecountComponent } from '../episodecount/episodecount.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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

  public progressID: string = ""

  public tempSeason!: number
  public tempEpisode!: number

  public dummyarray!: Season
  listId!: string 
  listType!: string 

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    public confModalRef: MdbModalRef<ConfirmationModalComponent>,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private confModalService: MdbModalService

    ) {}

  ngOnInit() {
    if(this.listId !== null && this.listId !== undefined){
      console.log(this.listId)
      this.modalType = this.listType
      this.tvId = this.listId
    } else {
      this.route.queryParams.subscribe(params => {
        this.modalType = params['type']
        this.tvId = params['id']
      })
    }
    
    
    if(this.modalType === 'T'){
      this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.tvId+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
        response => {

          this.httpClient.get<any>('http://localhost:8080/api/tv/find/'+localStorage.getItem("id")+"/"+this.tvId).subscribe(
            response => {
             // console.log(response[0])
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
               // localStorage.setItem("progressID" , response[0].id)
               this.progressID= response[0].id
                this.tempEpisode = response[0].episode_count
                this.tempSeason = response[0].season_count
              }
              
            })

         this.NumberOfEpisodes = response.number_of_episodes
         this.NumberOfSeasons = response.number_of_seasons
         // this.progressID = response.id
         this.Seasons = response.seasons 
          //console.log(response.seasons)
          
          if(Number(response.seasons[0].season_number) === 0){
            this.isLoaded = true
            
            
          } else {

           //this.Seasons = this.dummyarray.concat(response.seasons)
            this.Seasons.unshift(this.dummyarray)
            
            //console.log(this.Seasons)
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
           this.progressID= response[0].id
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


  deleteProgress(Type: String){
   /* if(Type === 'T'){
      this.handleDeleteTvProgress().subscribe()
    } else {

    }*/
    this.confModalRef = this.confModalService.open(ConfirmationModalComponent, {modalClass: 'modal-sm', data: {id: this.progressID, type: this.modalType}})
    this.confModalRef.onClose.subscribe((message: any) => {
      
      if(message == 'deleted'){
        this.modalRef.close('deleted')

      }
      
    }) 

    }
    
  

  

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
    var  tempFlag 
    
    if(type === 'T'){
      console.log(this.progressFlag)
      console.log(this.SelectedSeason)
      console.log(this.SelectedEpisode)
      switch (this.progressFlag) {
        case '1':
          tempFlag = "P"                    
          break;
        case '3':
          tempFlag = "F"                    
          break;
        case '5':
          tempFlag = "H"                    
          break;
        case '2':
          tempFlag = "W"
          break;
        case '4':
          tempFlag = "D"
          break;
      }

      if(this.found !== true){     
        
        this.handleShowSaveProgress(tempFlag,this.SelectedEpisode, this.SelectedSeason).subscribe()
        this.found = true;
        
      } else {
        if((this.SelectedEpisode !== this.tempEpisode) && (this.SelectedSeason !== this.tempSeason)){
          this.handleShowUpdateSeason(this.SelectedSeason).subscribe()
          this.handleShowUpdateEpisode(this.SelectedEpisode).subscribe()
        } else if((this.SelectedEpisode !== this.tempEpisode) && (this.SelectedSeason == this.tempSeason)){
          this.handleShowUpdateEpisode(this.SelectedEpisode).subscribe()
        } else if((this.SelectedEpisode == this.tempEpisode) && (this.SelectedSeason !== this.tempSeason)){
          this.handleShowUpdateSeason(this.SelectedSeason).subscribe()
        }

        this.handleShowUpdateFlag(tempFlag).subscribe()
      }

      this.modalRef.close()


    } else if(type === 'M') {
      //console.log(this.progressFlag)
      
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
        this.found = true;
        
      } else {

        
        
        this.handleMovieUpdateProgress(tempFlag).subscribe()
      }

      this.modalRef.close()
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

  handleShowSaveProgress(Flag:any, EpCount:any, SeCount:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "tvid": this.tvId,
      "flag": Flag,
      "episodecount": EpCount,
      "seasoncount": SeCount
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.post("http://localhost:8080/api/tv/"+localStorage.getItem("id")+"/create",body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress creation failed!");
       throw err;
     })
   )
  }

  handleShowUpdateFlag(Flag:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "tvid": this.tvId,
      "flag": Flag,
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.put("http://localhost:8080/api/tv/updateFlag/"+localStorage.getItem("id"),body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress update failed!");
       throw err;
     })
   )
  }
  handleShowUpdateEpisode(Episode:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "tvid": this.tvId,
      "episodecount": Episode,
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.put("http://localhost:8080/api/tv/updateEpisode/"+localStorage.getItem("id"),body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress update failed!");
       throw err;
     })
   )
  }
  handleShowUpdateSeason(Season:any){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "tvid": this.tvId,
      "seasoncount": Season,
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.put("http://localhost:8080/api/tv/updateSeason/"+localStorage.getItem("id"),body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress update failed!");
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
      
      

    