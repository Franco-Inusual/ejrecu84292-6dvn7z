import { Accion } from "./accion";

export interface Regla {
  reglaId: number;
  accionId: number;
  reglaTipo: string;
  select: string;
  where: string;
}