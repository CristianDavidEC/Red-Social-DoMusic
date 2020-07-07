import {Entity, model, property, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Notificacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idNotificacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  idRemitente: string;

  @hasOne(() => Usuario)
  usuario: Usuario;

  constructor(data?: Partial<Notificacion>) {
    super(data);
  }
}

export interface NotificacionRelations {
  // describe navigational properties here
}

export type NotificacionWithRelations = Notificacion & NotificacionRelations;
