import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

  public detailID: string | undefined
  public detailType: string | undefined

  constructor(
    
  ) { }

  setDetail(DI: string, DT: string) {
    this.detailID = DI
    this.detailType = DT
  }
  getDetailType() {
    return this.detailType
  }
  getDetailID() {
    return this.detailID
  }
}
