import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Publicacion>) {
    super(data);
  }
}

export interface PublicacionRelations {
  // describe navigational properties here
}

export type PublicacionWithRelations = Publicacion & PublicacionRelations;
