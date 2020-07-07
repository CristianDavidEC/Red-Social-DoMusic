import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evento} from './evento.model';
import {Encuesta} from './encuesta.model';
import {MusicoProfesional} from './musico-profesional.model';
import {Banda} from './banda.model';

@model()
export class Publicacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPublicacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
  })
  reacciones?: number;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'string',
  })
  archivo?: string;

  @belongsTo(() => Evento)
  eventoId: string;

  @belongsTo(() => Encuesta)
  encuestaId: string;

  @belongsTo(() => MusicoProfesional)
  musicoProfesionalId: string;

  @belongsTo(() => Banda)
  bandaId: string;

  constructor(data?: Partial<Publicacion>) {
    super(data);
  }
}

export interface PublicacionRelations {
  // describe navigational properties here
}

export type PublicacionWithRelations = Publicacion & PublicacionRelations;
