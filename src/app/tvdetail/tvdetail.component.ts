import { Component, OnInit } from '@angular/core';
import { Show } from '../model/Show';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../model/Person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tvdetail',
  templateUrl: './tvdetail.component.html',
  styleUrls: ['./tvdetail.component.scss']
})
export class TvdetailComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }

  public isLoaded: boolean = false
  public detail!: Show;
  public id: string | undefined
  public people!: Person[]
  public running : boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'?api_key='+environment.apiKey+'&language=en-US').subscribe(
      response => {
        this.detail = response
        if(this.detail.in_production) {
          this.running = true
          console.log(this.running)
        } else {
          console.log(this.running)
        }
        this.isLoaded = true;
    })

    this.httpClient.get<any>('https://api.themoviedb.org/3/tv/'+this.id+'/credits?api_key='+environment.apiKey+'&language=en-US').subscribe(
      Response => {
        this.people = Response.cast
      }
    )
    
  }

}
