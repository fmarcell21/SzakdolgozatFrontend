import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

 // LoginStatus$ = new BehaviorSubject<boolean>(null);
 // Username$ : Observable<string>;
  public sQuery: string = ""
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  search() {
    if(this.sQuery !== ""){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      
      //this.sQuery = this.sQuery.replace(' ','+')
      this.sQuery = this.sQuery.replace(/ /g, '+')
      console.log(this.sQuery)
      this.router.navigate(['/search'], {queryParams: {query: this.sQuery, page: 1}})
      this.sQuery = ''

    }
    
  }
}
