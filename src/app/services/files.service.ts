import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { environment } from '../../environments/environment';

interface File {
  originalname: string;
  filename:     string;
  location:     string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiURL:string = `${environment.API_URL}`;

  constructor(
    private httpClient:HttpClient
  ) { }

  getFile(name:string, url:string, type:string){
    return this.httpClient.get(url, {responseType: 'blob'})
    .pipe(
      tap(content=>{
        const blob = new Blob([content], {type})
        saveAs(blob, name);
      }),
      map(()=>true)
    )
  }

  uoploadFile(file:Blob){
    const dto = new FormData();
    dto.append('file', file);
    return this.httpClient.post<File>(`${this.apiURL}/api/files/upload`, dto,{
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    })
  }
}
