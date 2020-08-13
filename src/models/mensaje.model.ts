import {Entity, model, property, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Mensaje extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMensaje?: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  idReceptor: string;

  @property({
    type: 'string',
    required: true,
  })
  idRemitente: string;

  @hasOne(() => Usuario)
  usuario: Usuario;

  constructor(data?: Partial<Mensaje>) {
    super(data);
  }
}

export interface MensajeRelations {
  // describe navigational properties here
}

export type MensajeWithRelations = Mensaje & MensajeRelations;
