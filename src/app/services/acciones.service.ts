import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { of } from 'rxjs';
import { Accion } from '../models/accion';

@Injectable({
  providedIn: 'root',
})
export class AccionesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'http://localhost:8080/botMail/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl + 'getAcciones');
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + 'getAcciones/' + Id);
  }

  post(obj: Accion) {
    return this.httpClient.post(this.resourceUrl + 'grabarAccion', obj);
  }

  put(Id: number, obj: Accion) {
    return this.httpClient.put(this.resourceUrl + 'actualizarAccion', obj);
  }

  delete(Id: number) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
  ejecutarAccion(obj: Accion) {
    return this.httpClient.post(this.resourceUrl + 'enviarMail', obj);
  }

  activarDesactivarAccion(obj: Accion) {
    return this.httpClient.post(
      this.resourceUrl + 'activarDesactivarAccion',
      obj
    );
  }
}
