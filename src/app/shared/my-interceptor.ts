import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ModalDialogService } from '../services/modal-dialog.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private ms: ModalDialogService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let NoBloquearPantalla = req.headers.get('NoBloquearPantalla'); //EnTypeahead
    if (!NoBloquearPantalla) this.ms.BloquearPantalla();

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 401 handled in auth.interceptor
        if (
          // error.status !== 401 &&
          // error.error &&
          error.error instanceof Error
        ) {
          this.ms.Alert(error.error.message, 'Error', 'd');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, body was: ${error.error}`
          );
          this.ms.Alert(
            'Servidor No Iniciado. Intente nuevamente en unos segundos',
            'Google Cloud Error',
            'd'
          );
        }

        return throwError(error);
      }),
      finalize(() => {
        if (!NoBloquearPantalla) this.ms.DesbloquearPantalla();
      })
    );
  }
}
