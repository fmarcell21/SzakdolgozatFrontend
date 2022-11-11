import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  

  constructor(
    private httpClient: HttpClient,
    private router: Router

  ) { }
  public rMovies!: Movie[]
  public movie!: Movie
  public isLoaded: boolean = false

  public Password : string ="";
  public Username : string ="";



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
  //l:string, p: string
  //TODO rendes login handleing
  //Elküldi az adatokat az API-nak, ha OK-t kap vissza akkor redirect a HOME page-re és valahogy megjegyzi a felhasználót stb
  //DONE
  Login(loginForm: NgForm) {
    
    localStorage.clear
    localStorage.setItem("isLogged", "false");

    this.handleLogin(loginForm).subscribe(result => {
      //this.logindata = result;
      console.log(result)
      console.log("Login successfull.");
      localStorage.setItem("token",result.token);
    
      localStorage.setItem("id",result.id.toString());
      localStorage.setItem("username",result.username);
      localStorage.setItem("email",result.email);
     
      
      localStorage.setItem("isLogged", "true");
      //console.log(localStorage.getItem("admin"));
      this.router.navigate(['home']);

    })


    //console.log(loginForm.value, loginForm.valid)
   // console.log(loginForm.value['Username'])
  }


  handleLogin(data: NgForm):Observable<any>{
    const headers = {'content-type': 'application/json'}

    var jsonData = {
      "username": data.value['Username'],
      "password": data.value['Password']
    }

    const body = JSON.stringify(jsonData);
   // console.log(jsonData)
    return this.httpClient.post("http://localhost:8080/api/secure/login",body, { headers }).pipe(
      catchError((err) => {
        window.alert("Login failed");
        throw err
      })
    )
  }
}
