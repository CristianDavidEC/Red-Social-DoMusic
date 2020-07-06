import {DefaultCrudRepository} from '@loopback/repository';
import {MusicoProfesional, MusicoProfesionalRelations} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MusicoProfesionalRepository extends DefaultCrudRepository<
  MusicoProfesional,
  typeof MusicoProfesional.prototype.idMusicoProfesional,
  MusicoProfesionalRelations
> {
  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource,
  ) {
    super(MusicoProfesional, dataSource);
  }
}
