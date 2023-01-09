import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { of } from 'rxjs';
import { Regla } from '../models/regla';

@Injectable({
  providedIn: 'root',
})
export class ReglasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'http://localhost:8080/reglas/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl + 'getReglas');
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + 'getReglas/' + Id);
  }

  post(obj: Regla) {
    return this.httpClient.post(this.resourceUrl + 'grabarRegla', obj);
  }

  put(Id: number, obj: Regla) {
    return this.httpClient.put(this.resourceUrl + 'actualizarRegla', obj);
  }

  delete(Id: number) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}
