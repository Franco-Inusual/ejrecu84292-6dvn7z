import { Component, OnInit } from '@angular/core';
import { LotesService } from '../../services/lotes.service';
import { Evento } from '../../models/evento';
import { Parametro } from '../../models/parametro';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css'],
})
export class LotesComponent implements OnInit {
  // Variable to store shortLink from api response
  Titulo = 'Carga de Lote';
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  Items: Evento[];
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  AccionABMC = 'L';
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };

  // Inject service
  constructor(private lotesService: LotesService) {}

  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {}

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    this.loading = false;
  }

  // OnClick of button Upload
  onUpload() {
    this.Items = [];
    //console.log(this.file);
    this.lotesService.upload(this.file).subscribe((res: any) => {
      this.loading = true;
      (error) => (this.loading = false);
      this.Items = res;
      this.AccionABMC = 'L';
      console.log(this.Items);
    });
  }

  talkToServer() {
    this.lotesService.talkToServer().subscribe(
      (data) => console.log('success', data),
      (error) => (this.errorMessage = error.message)
    );
  }
}
