import {Entity, model, property} from '@loopback/repository';

@model()
export class Banda extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idBanda?: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  nombre: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  listaIntegrantes: string[];

  @property({
    type: 'string',
    required: true,
  })
  generoMusical: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  fotoPerfil: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  seguidores?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  seguidos?: string[];


  constructor(data?: Partial<Banda>) {
    super(data);
  }
}

export interface BandaRelations {
  // describe navigational properties here
}

export type BandaWithRelations = Banda & BandaRelations;
