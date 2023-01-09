import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
} from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';

import { MailsComponent } from './components/mails/mails.component';
import { AccionesComponent } from './components/acciones/acciones.component';
import { ReglasComponent } from './components/reglas/reglas.component';
import { LotesComponent } from './components/lotes/lotes.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

import { MyInterceptor } from './shared/my-interceptor';

import { DatePickerAdapterISO } from './shared/DatePickerAdapterISO';
import { DatePickerParserFormatter } from './shared/DatePickerParserFormater';
import { DatePickerSpanish } from './shared/DatePickerSpanish';
import { FormFocusDirective } from './shared/form-focus.directive';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CodemirrorModule,

    //Ref Angular Routing
    RouterModule.forRoot(
      [
        { path: '', redirectTo: '/mails', pathMatch: 'full' },
        { path: 'mails', component: MailsComponent },
        { path: 'prueba', component: PruebaComponent },
        { path: 'acciones', component: AccionesComponent },
        { path: 'reglas', component: ReglasComponent },
        { path: 'lotes', component: LotesComponent },
        { path: '**', redirectTo: '/mails', pathMatch: 'full' },
      ],
      {
        relativeLinkResolution: 'legacy',
        // Ref Angular LazyLoad #2 https://angular.io/guide/lazy-loading-ngmodules
        preloadingStrategy: PreloadAllModules,
      }
    ),
    NgbModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    FormsModule,
    EditorModule,
  ],
  declarations: [
    AppComponent,

    MenuComponent,

    ModalDialogComponent,

    MailsComponent,
    PruebaComponent,
    AccionesComponent,
    ReglasComponent,
    LotesComponent,

    //FormFocusDirective
  ],
  entryComponents: [ModalDialogComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },

    // ref angular ngbootrapt datepicker
    { provide: NgbDateAdapter, useClass: DatePickerAdapterISO },
    { provide: NgbDateParserFormatter, useClass: DatePickerParserFormatter }, // formato datepicker desde/hacia el imput
    { provide: NgbDatepickerI18n, useClass: DatePickerSpanish },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
