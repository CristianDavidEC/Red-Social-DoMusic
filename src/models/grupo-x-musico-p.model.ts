import {Entity, model, property, hasMany} from '@loopback/repository';
import {MusicoProfesional} from './musico-profesional.model';
import {Grupo} from './grupo.model';

@model()
export class GrupoXMusicoP extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idGrupoXMusicoP?: string;

  @hasMany(() => MusicoProfesional)
  musicoProfesionals: MusicoProfesional[];

  @hasMany(() => Grupo)
  grupos: Grupo[];

  constructor(data?: Partial<GrupoXMusicoP>) {
    super(data);
  }
}

export interface GrupoXMusicoPRelations {
  // describe navigational properties here
}

export type GrupoXMusicoPWithRelations = GrupoXMusicoP & GrupoXMusicoPRelations;
