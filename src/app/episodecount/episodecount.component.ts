import { Component, OnInit, Input} from '@angular/core';
import { Season } from '../model/Season';



@Component({
  selector: 'app-episodecount',
  templateUrl: './episodecount.component.html',
  styleUrls: ['./episodecount.component.scss']
})
export class EpisodecountComponent implements OnInit {

  @Input() Season!: Season

  public EpisodeCount: string =""

  constructor() { }

  ngOnInit(): void {
    this.EpisodeCount = this.Season.episode_count

  }
  
}
