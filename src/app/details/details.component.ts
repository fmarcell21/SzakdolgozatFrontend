import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { DetailServiceService } from '../services/detail-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public ldetailType: string | undefined
  public ldetailID: string | undefined

  constructor(
    private route: ActivatedRoute,
    private detailservice: DetailServiceService
   
  ) { }

  ngOnInit(): void {
   /* this.route.queryParams.subscribe(params => {
      this.detailType = params['detailType'];
      this.detailID = params['detailID'];
      console.log(this.detailID)
      console.log(this.detailType)
     
    }) */
    this.ldetailID = this.detailservice.getDetailID()
    this.ldetailType = this.detailservice.getDetailType()
  }

}
