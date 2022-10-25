import { Component, OnChanges, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Season } from '../model/Season';


@Component({
  selector: 'app-episodecount',
  templateUrl: './episodecount.component.html',
  styleUrls: ['./episodecount.component.scss']
})
export class EpisodecountComponent implements OnChanges {

  @Input() Season!: Season
  @Input() Seasons!: Season[]
  @Input() Selected!: number

  //public EpisodeCount: string =""

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  //ngOnInit(): void { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['Selected']) {
      //this.createTimeline(changes['Selected'].currentValue[0].id)
      console.log(this.Selected)
    }
  }
}
