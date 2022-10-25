import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

 // LoginStatus$ = new BehaviorSubject<boolean>(null);
 // Username$ : Observable<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
