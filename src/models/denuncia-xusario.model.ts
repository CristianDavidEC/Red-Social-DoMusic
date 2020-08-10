import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class DenunciaXusario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDenunciaXusuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  archivoPrueba: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuarioReportado: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<DenunciaXusario>) {
    super(data);
  }
}

export interface DenunciaXusarioRelations {
  // describe navigational properties here
}

export type DenunciaXusarioWithRelations = DenunciaXusario & DenunciaXusarioRelations;
