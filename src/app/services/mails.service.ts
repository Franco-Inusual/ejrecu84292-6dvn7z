import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailsService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'http://localhost:8080/botMail/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl + 'consultar/1/');
  }

  conectar(UserMail: string, UserPassword: string, Host: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('user', UserMail);
    queryParams = queryParams.append('password', UserPassword);
    queryParams = queryParams.append('host', Host);
    return this.httpClient.get(this.resourceUrl + 'conectar/', {
      params: queryParams,
    });
  }

  enviar() {
    return this.httpClient.get(this.resourceUrl + 'enviar/');
  }

  cargarMail(Contenido: string){
    return this.httpClient.post(this.resourceUrl + 'recibirMail/', Contenido)
  }
}
