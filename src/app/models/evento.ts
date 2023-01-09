import { Parametro } from './parametro';

export interface Evento {
  eventosId: number;
  destinatario: string;
  nombreDestinatario: string;
  accionId: number;
  loteId: number;
  fechaEstado: string;
  parametros: Parametro[];
}
