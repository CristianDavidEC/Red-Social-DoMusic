import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Publicacion} from './publicacion.model';
import {Usuario} from './usuario.model';

@model()
export class Comentario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idComentario?: string;

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
  usuarioId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  hijo: string;

  @belongsTo(() => Publicacion)
  publicacionId: string;

  @hasOne(() => Usuario)
  usuario: Usuario;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
