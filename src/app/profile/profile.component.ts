import { Component, OnInit } from '@angular/core';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Count } from '../model/Count';
import { Chart } from 'chart.js';
import { dataPointsModel } from '../model/dataPointsModel';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/Movie';
import { Show } from '../model/Show';
import { Person } from '../model/Person';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private HttpClient: HttpClient
  ) { }
    public FavMovies: Movie[] = []
    public FavTv: Show[] = []
    public FavPerson: Person[] = []

    public MovieCount!:Count
    public TvCount!:Count
    public isLoaded= false;
    public movieLoaded = false;
    public tvLoaded = false;
    //public dataPoints: String[]  = []
    //public dataPointsModel: dataPointsModel[] = []




  ngOnInit(): void {
    CanvasJS.addColorSet("progressColours",
                [//colorSet Array

                "#ABDEE6",
                "#97C1A9",
                "#FF968A",
                "#808080",
                "#FFFFB5"                
    ]);
    CanvasJS.addColorSet("movieProgressColours",
                [//colorSet Array

                
                "#97C1A9",
                "#FF968A",
                "#808080",
                               
    ]);

    
      this.HttpClient.get<any>("http://localhost:8080/api/movie/find/"+ localStorage.getItem("id")+"/fav").subscribe(
      Response1 => {

        //console.log(Response1)
        for(let i = 0; i <Response1.length; i++){
          //console.log(Response1[i])
          
          this.HttpClient.get<any>('https://api.themoviedb.org/3/movie/'+Response1[i].movieid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
               response2 => {
               // console.log(response2)
                
                this.FavMovies.push(response2)
                  
            })            
          }
        }       
      )
      this.HttpClient.get<any>("http://localhost:8080/api/tv/find/"+ localStorage.getItem("id")+"/fav").subscribe(
        Response1 => {
  
          //console.log(Response1)
          for(let i = 0; i <Response1.length; i++){
            //console.log(Response1[i])
            
            this.HttpClient.get<any>('https://api.themoviedb.org/3/tv/'+Response1[i].tvid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
                 response2 => {
                 // console.log(response2)
                  
                  this.FavTv.push(response2)
                    
              })            
            }
          }       
        )

        this.HttpClient.get<any>("http://localhost:8080/api/person/find/"+ localStorage.getItem("id")+"/fav").subscribe(
          Response1 => {
    
            //console.log(Response1)
            for(let i = 0; i <Response1.length; i++){
              //console.log(Response1[i])
              
              this.HttpClient.get<any>('https://api.themoviedb.org/3/person/'+Response1[i].perid+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
                   response2 => {
                   // console.log(response2)
                    
                    this.FavPerson.push(response2)
                      
                })            
              }
            }       
          )
      //console.log(this.FavMovies)


    //http://localhost:8080/api/person/find/{{userid}}/fav
    this.HttpClient.get<any>( "http://localhost:8080/api/movie/find/flagCount/"+localStorage.getItem("id")).subscribe(
      Response => {
        
        this.MovieCount = Response[0]
       // console.log(this.MovieCount)

        if(this.MovieCount.W === undefined){
          Object.assign(this.MovieCount, {W: "0"})
        }
        if(this.MovieCount.D === undefined){
          Object.assign(this.MovieCount, {D: "0"})
        }
        if(this.MovieCount.P === undefined){
          Object.assign(this.MovieCount, {P: "0"})
        }
        if(this.MovieCount.All === undefined){
          Object.assign(this.MovieCount, {All: "0"})
        }
        var dps = []
        
        dps.push({y: Number(this.MovieCount.W), name: "Finished"})
        dps.push({y: Number(this.MovieCount.D), name: "Dropped"})
        dps.push({y: Number(this.MovieCount.P), name: "Plan to watch"})
        this.movieOptions.data[0].dataPoints = dps;
       // console.log(this.movieOptions.data[0].dataPoints)
       // console.log(this.dataPoints)
    
        //Object.assign(this.movieOptions.data[0], this.dataPoints)
        
        this.movieLoaded = true;
      }
    )
    this.HttpClient.get<any>( "http://localhost:8080/api/tv/find/flagCount/"+localStorage.getItem("id")).subscribe(
      Response => {
        
        this.TvCount = Response[0]
       // console.log( this.TvCount)
        if(this.TvCount.W === undefined){
          Object.assign(this.MovieCount, {W: "0"})
        }
        if(this.TvCount.H === undefined){
          Object.assign(this.MovieCount, {H: "0"})
        }
        if(this.TvCount.F === undefined){
          Object.assign(this.MovieCount, {F: "0"})
        }
        if(this.TvCount.D === undefined){
          Object.assign(this.MovieCount, {D: "0"})
        }
        if(this.TvCount.P === undefined){
          Object.assign(this.MovieCount, {P: "0"})
        }
        if(this.TvCount.All === undefined){
          Object.assign(this.MovieCount, {All: "0"})
        }
        var dps = []
        dps.push({y: Number(this.TvCount.W), name: "Watching"})
        dps.push({y: Number(this.TvCount.F), name: "Finished"})
        dps.push({y: Number(this.TvCount.D), name: "Dropped"})
        dps.push({y: Number(this.TvCount.P), name: "Plan to watch"})
        dps.push({y: Number(this.TvCount.H), name: "On Hold"})
        this.tvOptions.data[0].dataPoints = dps;
        
        this.tvLoaded = true;
      }
    )

      this.isLoaded = true
  }
  redirect(id : string, type: string) {
    console.log(id)

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/details'], { queryParams: {type: type, id: id }})
    


  }

  toList(list: string){
    if(list === 'M'){
      this.router.navigate(['/movielist'], {queryParams: {view: 'A'}})
    } else {
      this.router.navigate(['/tvlist'], {queryParams: {view: 'A'}})
    }
  }
 //az y-nak 10x annyinak kell lennie itt, mint a megjelenítettnél
 movieOptions = {
  interactivityEnabled:false,
  animationEnabled: true,
  colorSet: "movieProgressColours",
  backgroundColor: "#1f3541",
  theme: "dark2",
  data: [{
    type: "pie",
    startAngle: 45,
    dataPoints: [
      //{y: 22, name: "Watching"},
      //{name: "Finished"},
       //{name: "Dropped"},
      //{name: "Plan to watch"},
      //{y: 20, name: "On hold"},
      {y: 0, name: "Finished"},
      {y: 0, name: "Dropped"},
      {y: 0, name: "Plan to watch"},

    ]
  }]
}

  tvOptions = {
    interactivityEnabled:false,
    animationEnabled: true,
    colorSet: "progressColours",
    backgroundColor: "#1f3541",
    theme: "dark2",
    data: [{
      type: "pie",
      startAngle: 45,      
      dataPoints: [
        {y: 0, name: "Watching"},
        {y: 0, name: "Finished"},
        {y: 0, name: "Dropped"},
        {y: 0, name: "Plan to watch"},
        {y: 0, name: "On hold"},
      ]
    }]
  }

  
}
