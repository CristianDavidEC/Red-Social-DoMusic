import {Entity, model, property, hasOne} from '@loopback/repository';
import {Publicacion} from './publicacion.model';

@model()
export class Encuesta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEncuesta?: string;

  @property({
    type: 'string',
    required: true,
  })
  pregunta: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  respuestas: string[];

  @property({
    type: 'string',
  })
  respuestaUsuario?: string;

  @hasOne(() => Publicacion)
  publicacion: Publicacion;

  constructor(data?: Partial<Encuesta>) {
    super(data);
  }
}

export interface EncuestaRelations {
  // describe navigational properties here
}

export type EncuestaWithRelations = Encuesta & EncuestaRelations;
