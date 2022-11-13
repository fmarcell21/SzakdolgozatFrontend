import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  public progressID: string | null= ""

  id: string | null = null
  type: string | null = null

  constructor(
   public modalRef: MdbModalRef<ConfirmationModalComponent>,
   private modalService: MdbModalService,
   private httpClient: HttpClient
  ) { }
    

  ngOnInit(): void {
    //this.progressID = localStorage.getItem("progressID")
   // console.log("conf")
    //console.log(this.id)
  //  console.log(this.type)
  }
  deleteProg(){
    if(this.type === 'T'){
      this.handleDeleteTvProgress().subscribe()
      
      this.modalRef.close('deleted')
      //this.parentModalRef.close()
      
      
    } else {
      //console.log("delete movie")
      this.handleDeleteMovieProgress().subscribe()
      this.modalRef.close('deleted')
    }

  }

  handleDeleteTvProgress(){

    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "id": this.id,
    }
    const body = JSON.stringify(jsonData);
    

   return this.httpClient.post("http://localhost:8080/api/tv/delete",body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress deletion failed!");
       throw err;
     })
   )

  }

  handleDeleteMovieProgress(){
    const headers = {'content-type': 'application/json'}
    var jsonData = {
      "id": this.id,
    }
    const body = JSON.stringify(jsonData);
    

   return this.httpClient.post("http://localhost:8080/api/movie/delete",body,{ headers, responseType: 'text' }).pipe (
     catchError((err) => {
       console.error(err);
       window.alert(" Progress deletion failed!");
       throw err;
     })
   )
    
  }
}
