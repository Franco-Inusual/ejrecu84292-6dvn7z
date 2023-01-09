import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { Mail } from '../../models/mail';
import { MailsService } from '../../services/mails.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css'],
})
export class MailsComponent implements OnInit {
  Titulo = 'Mails Enviados';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
    I: '(Login)',
    E: '(Enviar)',
  };
  AccionABMC = 'I'; // inicialmente inicia en el Listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  Items: Mail[] = null;
  Conectado: boolean = false;
  ConexionFallida: boolean = false;
  Host: string;
  UserMail: string;
  UserPassword: string;
  ArchivoSeleccionado: boolean = false;

  RegistrosTotal: number;

  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesActivo = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];

  OpcionesHost = [
    { Id: 'smtp.gmail.com', Nombre: 'Gmail' },
    { Id: 'outlook', Nombre: 'Outloook' },
    { Id: 'yahoo', Nombre: 'Yahoo' },
  ];

  FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
    Activo: new FormControl(null),
  });

  FormRegistro = new FormGroup({
    mail: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    fecha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
    respondido: new FormControl(false, [Validators.required]),
  });

  FormLogin = new FormGroup({
    host: new FormControl('smtp.gmail.com', [Validators.required]),

    userMail: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    userPassword: new FormControl('', [Validators.required]),
  });

  submitted = false;

  constructor(
    private mailsService: MailsService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {}

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdPersona: 0 });
    this.submitted = false;
    //this.FormRegistro.markAsPristine();  // incluido en el reset
    //this.FormRegistro.markAsUntouched(); // incluido en el reset
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    this.mailsService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }

  Conectar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormLogin.invalid) {
      return;
    }
    this.mailsService
      .conectar(
        this.FormLogin.value.userMail,
        this.FormLogin.value.userPassword,
        this.FormLogin.value.host
      )
      .subscribe((res: any) => {
        this.Conectado = res;
        this.ConexionFallida = !res;
        if (this.Conectado) {
          this.AccionABMC = 'L';
        }
      });
  }

  Enviar() {
    this.mailsService.enviar().subscribe((res: any) => {
      this.Items = res;
      //this.AccionABMC = 'E';
    });
  }

  // // Obtengo un registro especifico según el Id
  // BuscarPorId(Item, AccionABMC) {
  //   window.scroll(0, 0); // ir al incio del scroll

  //   this.personasService.getById(Item.IdPersona).subscribe((res: any) => {
  //     this.FormRegistro.patchValue(res);

  //     //formatear fecha de  ISO 8061 a string dd/MM/yyyy
  //     var arrFecha = res.FechaNacimiento.substr(0, 10).split('-');
  //     this.FormRegistro.controls.FechaNacimiento.patchValue(
  //       arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0]
  //     );

  //     this.AccionABMC = AccionABMC;
  //   });
  // }

  // Consultar(Item) {
  //   this.BuscarPorId(Item, 'C');
  // }

  // // comienza la modificacion, luego la confirma con el metodo Grabar
  // Modificar(Item) {
  //   this.BuscarPorId(Item, 'M');
  //   this.submitted = false;
  //   this.FormRegistro.markAsUntouched();
  // }

  // // grabar tanto altas como modificaciones
  // Grabar() {
  //   this.submitted = true;
  //   // verificar que los validadores esten OK
  //   if (this.FormRegistro.invalid) {
  //     return;
  //   }

  //   //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
  //   const itemCopy = { ...this.FormRegistro.value };

  //   //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
  //   var arrFecha = itemCopy.FechaNacimiento.substr(0, 10).split('/');
  //   if (arrFecha.length == 3)
  //     itemCopy.FechaNacimiento = new Date(
  //       arrFecha[2],
  //       arrFecha[1] - 1,
  //       arrFecha[0]
  //     ).toISOString();

  //   // agregar post
  //   if (this.AccionABMC == 'A') {
  //     this.personasService.post(itemCopy).subscribe((res: any) => {
  //       this.Volver();
  //       this.modalDialogService.Alert('Registro agregado correctamente.');
  //       this.Buscar();
  //     });
  //   } else {
  //     // modificar put
  //     this.personasService
  //       .put(itemCopy.IdPersona, itemCopy)
  //       .subscribe((res: any) => {
  //         this.Volver();
  //         this.modalDialogService.Alert('Registro modificado correctamente.');
  //         this.Buscar();
  //       });
  //   }
  // }

  // // representa la baja logica
  // ActivarDesactivar(Item) {
  //   this.modalDialogService.Confirm(
  //     'Esta seguro de ' +
  //       (Item.Activo ? 'desactivar' : 'activar') +
  //       ' este registro?',
  //     undefined,
  //     undefined,
  //     undefined,
  //     () =>
  //       this.articulosService
  //         .delete(Item.IdArticulo)
  //         .subscribe((res: any) => this.Buscar()),
  //     null
  //   );
  // }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    this.modalDialogService.Alert('Sin desarrollar...');
  }
}
