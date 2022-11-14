import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,

  ) { }
    public rMovies!: Movie[]
    public movie!: Movie
    public isLoaded: boolean = false

    public Username: string =""
    public Password: string =""
    public Email: string =""

  ngOnInit(): void {
    this.httpClient.get<any>(' https://api.themoviedb.org/3/movie/top_rated?api_key='+environment.apiKey+'&language=en-US&page=1').subscribe ( 
      response =>{
        this.rMovies = response.results
        let random = Math.floor(Math.random() * this.rMovies.length)
       // let rand = response[~~(Math.random() * this.rMovies.length)]
        //console.log(this.rMovies.length)
        this.movie = this.rMovies[random]
        this.isLoaded = true
      })
  }

  //Megnézi hogy valid e az input (email email-e) -> api register (talán egy get az emailre és a username-re hogy benne van e már az adatbázisban), utánna egy post (felregisztrál) -> navigate to home
  register(reg:NgForm){
    console.log(reg.value)
    this.handleRegister(reg).subscribe(result => {
      console.warn(result)
      window.alert(result)
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/login'])
  }

  handleRegister(data:NgForm){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "username": data.value["Username"],
      "password":data.value["Password"],
      "email": data.value["Email"]
    }
    const body = JSON.stringify(jsonData);

   return this.httpClient.post("http://localhost:8080/api/secure/register",body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert("Registration failed");
       throw err;
     })
   )
  }

}
