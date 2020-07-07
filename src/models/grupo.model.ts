import {Entity, model, property, belongsTo} from '@loopback/repository';
import {GrupoXAficionado} from './grupo-x-aficionado.model';
import {GrupoXMusicoP} from './grupo-x-musico-p.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idGrupo?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  generoMusical: string;

  @belongsTo(() => GrupoXAficionado)
  grupoXAficionadoId: string;

  @belongsTo(() => GrupoXMusicoP)
  grupoXMusicoPId: string;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
