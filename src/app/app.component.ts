import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  

  currentRoute(){
   if( window.location.pathname !== '/login' && window.location.pathname !== '/register'){
    return true
   } else {
    return false
   }
  }

}
