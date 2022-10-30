import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from '../model/Show';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

    public ListSort: string ="A"
    public TList!: Show[]
    public isLoaded = false

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ListSort = params['view']
      console.log(this.ListSort)
      this.isLoaded = true
     // console.log(this.id)
    })

  }
  redirect(path: string) {
    this.router.navigate(['/tvlist'],{ queryParams: {view: path}})
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
