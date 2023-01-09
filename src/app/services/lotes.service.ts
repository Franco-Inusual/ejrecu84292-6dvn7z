// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class LotesService {
// // API url
// baseApiUrl = "http://localhost:8080/botMail/procesarExcel2/"

// constructor(private http:HttpClient) { }

// // Returns an observable
// upload(file):Observable<any> {

//     // Create form data
//     const formData = new FormData();

//     // Store form name as "file" with file data
//     formData.append("mail", file, file.name);

//     // Make http post request over api
//     // with formData as req
//     return this.http.post(this.baseApiUrl, formData)
// }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LotesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'http://localhost:8080/botMail/procesarExcel2/';
  }

  upload(file) {
    const formData = new FormData();
    formData.append('mail', file, file.name);
    return this.httpClient.post(this.resourceUrl, formData);
  }

  talkToServer():Observable<any> {
    return this.httpClient.get('http://localhost:8080/');
  }

}
