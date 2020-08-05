import {belongsTo, Entity, hasMany, model, property, hasOne} from '@loopback/repository';
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
  tipo: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  listaComentarios: string[];

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @hasMany(() => Comentario)
  comentarios: Comentario[];

  @property({
    type: 'string',
  })
  comentarioId?: string;

  @belongsTo(() => Comentario)
  cComentarioId: string;

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
