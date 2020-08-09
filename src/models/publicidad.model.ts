import {Entity, model, property} from '@loopback/repository';

@model()
export class Publicidad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPublicidad?: string;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;


  constructor(data?: Partial<Publicidad>) {
    super(data);
  }
}

export interface PublicidadRelations {
  // describe navigational properties here
}

export type PublicidadWithRelations = Publicidad & PublicidadRelations;
