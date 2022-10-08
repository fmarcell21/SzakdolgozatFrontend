import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DetailServiceService } from '../services/detail-service.service';



import { Movie } from '../model/Movie';
import { Show } from '../model/Show';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public sDetail: Show | undefined;
 // public mDetail: Movie | undefined;
  
  public detailType: string | undefined
  public detailID: string | undefined

  constructor(
    private route: ActivatedRoute,
    private detailservice: DetailServiceService,
    
   
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.detailType = params['type']
     // console.log(this.detailType)
    })
    
  }

  

  

}


/*this.route.queryParams.subscribe(params => {
      if (params['type'] === 'M'){
        this.mDetail = this.detailservice.getDetails(params['type'],params['id'])
      } else if (params['type'] === 'T') {
        this.sDetail = this.detailservice.getDetails(params['type'],params['id'])
      } 
        

       // console.log('details component')
        //console.log(this.detail)
      
     
    }) */
    //console.log('details component')
    //console.log(this.detail)