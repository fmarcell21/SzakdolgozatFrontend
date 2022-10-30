import { Component, OnInit } from '@angular/core';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    CanvasJS.addColorSet("progressColours",
                [//colorSet Array

                "#0000ff",
                "#008000",
                "#ff0000",
                "#808080",
                "#ffff00"                
                ]);
  }
  redirect(id : string) {
    console.log(id)
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
    colorSet: "progressColours",
    backgroundColor: "#1f3541",
    theme: "dark2",
    data: [{
      type: "pie",
      startAngle: 45,
      dataPoints: [
        {y: 22, name: "Watching"},
        {y: 20, name: "Finished"},
        {y: 230, name: "Dropped"},
        {y: 20, name: "Plan to watch"},
        {y: 20, name: "On hold"},
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
        {y: 12, name: "Watching"},
        {y: 12, name: "Finished"},
        {y: 12, name: "Dropped"},
        {y: 12, name: "Plan to watch"},
        {y: 12, name: "On hold"},
      ]
    }]
  }
}
