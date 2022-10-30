import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../model/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  public ListSort: string ="A"
  public MList!: Movie[]
  public isLoaded = false
  //todo: REST API-tól, a view értékének megfelelően intézi a lekérést ('A' mindent lekér a listában stb stb stb)

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ListSort = params['view']
      console.log(this.ListSort)
      this.isLoaded = true
     // console.log(this.id)
    })

  }

  redirect(path: string) {
    this.router.navigate(['/movielist'],{ queryParams: {view: path}})
  }
  
  onClick(detailId: string, detailType: string){
    // this.router.navigateByUrl('/details'); ///'+detailType+detailId
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/details'], { queryParams: {type: detailType, id: detailId }})
    // console.log(detailId);
     //console.log(detailType)
    // this.detailservice.setDetail(detailId, detailType)
   }
}
