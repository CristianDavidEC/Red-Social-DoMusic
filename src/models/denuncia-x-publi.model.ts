import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class DenunciaXPubli extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDenunciaXPubli?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  archivoPrueba: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  publicacionId: string;
  

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<DenunciaXPubli>) {
    super(data);
  }
}

export interface DenunciaXPubliRelations {
  // describe navigational properties here
}

export type DenunciaXPubliWithRelations = DenunciaXPubli & DenunciaXPubliRelations;
