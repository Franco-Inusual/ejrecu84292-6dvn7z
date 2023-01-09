import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { Accion } from '../../models/accion';
import { Evento } from '../../models/evento';
import { AccionesService } from '../../services/acciones.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css'],
})
export class AccionesComponent implements OnInit {
  content: string;
  Titulo = 'Acciones';
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC = 'L'; // inicialmente inicia en el Listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  Eventos: Evento[] = null;
  Items: Accion[] = null;
  RegistrosTotal: number;
  AccionEjecutada: Accion = null;

  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesActivo = [
    { Id: 1, Nombre: 'SI' },
    { Id: 0, Nombre: 'NO' },
  ];

  FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
    Activo: new FormControl(null),
  });

  FormRegistro = new FormGroup({
    accionId: new FormControl(0),
    accionNombre: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    accionAsunto: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    accionCc: new FormControl(''),
    accionCco: new FormControl(''),
    accionActiva: new FormControl(1, [Validators.required]),
    accionCuerpo: new FormControl(''),
  });

  submitted = false;

  constructor(
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private accionesService: AccionesService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.content = `<p>Escriba el <strong>cuerpo</strong> del mail aquí</p>`;
  }

  setEditorContent(event) {
    // console.log(event, typeof event);
  }

  Agregar() {
    this.AccionABMC = 'A';
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
    this.submitted = false;
    //this.FormRegistro.markAsPristine();  // incluido en el reset
    //this.FormRegistro.markAsUntouched(); // incluido en el reset
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    this.accionesService.get().subscribe((res: any) => {
      this.Items = res;
      this.Items.shift();
    });
  }
  Ejecutar(Item) {
    this.modalDialogService.Confirm(
      'Esta seguro de ejecutar esta acción?',
      undefined,
      undefined,
      undefined,
      () =>
      this.accionesService
      .ejecutarAccion(Item)
      .subscribe((res: any) => {this.Eventos = res;
        this.AccionEjecutada = Item;
    }),null);
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Item, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.accionesService.getById(Item.accionId).subscribe((res: any) => {
      this.FormRegistro.patchValue(res);
      this.content = res.accionCuerpo;
      this.AccionABMC = AccionABMC;
    });
  }

  Consultar(Item) {
    this.BuscarPorId(Item, 'C');
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Item) {
    this.BuscarPorId(Item, 'M');
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegistro.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };

    // agregar post
    if (this.AccionABMC == 'A') {
      this.accionesService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.accionesService
        .put(itemCopy.accionId, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.Buscar();
        });
    }
  }

  // representa la baja logica
  ActivarDesactivar(Item) {
    this.modalDialogService.Confirm(
      'Esta seguro de ' +
        (Item.accionActiva ? 'desactivar' : 'activar') +
        ' esta acción?',
      undefined,
      undefined,
      undefined,
      () =>
        this.accionesService
          .activarDesactivarAccion(Item)
          .subscribe((res: any) => this.Buscar()),
      null
    );
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  Volver() {
    this.AccionABMC = 'L';
  }

  ImprimirListado() {
    this.modalDialogService.Alert('Sin desarrollar...');
  }
}
