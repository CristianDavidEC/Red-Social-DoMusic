import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aficionado} from './aficionado.model';
import {Grupo} from './grupo.model';

@model()
export class GrupoXAficionado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idGrupoXAficionado?: string;

  @hasMany(() => Aficionado)
  aficionados: Aficionado[];

  @hasMany(() => Grupo)
  grupos: Grupo[];

  constructor(data?: Partial<GrupoXAficionado>) {
    super(data);
  }
}

export interface GrupoXAficionadoRelations {
  // describe navigational properties here
}

export type GrupoXAficionadoWithRelations = GrupoXAficionado & GrupoXAficionadoRelations;
