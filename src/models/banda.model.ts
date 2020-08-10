import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Publicacion} from './publicacion.model';
import {Usuario} from './usuario.model';

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
    required: false,
  })
  image?: string;

  @property({
    type: 'string',
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

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasOne(() => Publicacion)
  publicacion: Publicacion;

  @hasMany(() => Publicacion)
  publicacions: Publicacion[];

  constructor(data?: Partial<Banda>) {
    super(data);
  }
}

export interface BandaRelations {
  // describe navigational properties here
}

export type BandaWithRelations = Banda & BandaRelations;
