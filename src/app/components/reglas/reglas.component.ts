import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { Accion } from '../../models/accion';
import { Regla } from '../../models/regla';
import { ReglasService } from '../../services/reglas.service';
import { AccionesService } from '../../services/acciones.service';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css'],
})
export class ReglasComponent implements OnInit {
  content: string;
  Titulo = 'Reglas';
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

  Items: Regla[] = null;
  Acciones: Accion[] = [];
  RegistrosTotal: number;

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
    reglaId: new FormControl(0),
    accionId: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    reglaTipo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),

    select: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5005),
    ]),
    where: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5005),
    ]),
  });

  submitted = false;

  constructor(
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private reglasService: ReglasService,
    private accionesService: AccionesService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.GetAcciones();
  }

  setEditorContent(event) {
    // console.log(event, typeof event);
  }

  GetAcciones() {
    this.accionesService.get().subscribe((res: Accion[]) => {
      this.Acciones = res;
    });
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
    this.reglasService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Item, AccionABMC) {
    window.scroll(0, 0); // ir al incio del scroll

    this.reglasService.getById(Item.reglaId).subscribe((res: any) => {
      // res.accion = res.accion.accionId;
      // console.log(res.accion);
      this.FormRegistro.patchValue(res);
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
    // this.accionesService.getById(itemCopy.accion).subscribe((res: any) => {
    //   itemCopy.accion = res;
    // });
    // console.log(itemCopy);
    // agregar post
    if (this.AccionABMC == 'A') {
      this.reglasService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    } else {
      // modificar put
      this.reglasService
        .put(itemCopy.reglaId, itemCopy)
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
      'Esta seguro de eliminar este registro?',
      undefined,
      undefined,
      undefined,
      () =>
        this.reglasService
          .delete(Item.reglaId)
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
  GetAccionNombre(Id) {
    var Nombre = this.Acciones.find((x) => x.accionId === Id)?.accionNombre;
    return Nombre;
  }
}
