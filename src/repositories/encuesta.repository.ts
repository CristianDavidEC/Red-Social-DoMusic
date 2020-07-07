import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Encuesta, EncuestaRelations, Publicacion} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionRepository} from './publicacion.repository';

export class EncuestaRepository extends DefaultCrudRepository<
  Encuesta,
  typeof Encuesta.prototype.idEncuesta,
  EncuestaRelations
> {

  public readonly publicacion: HasOneRepositoryFactory<Publicacion, typeof Encuesta.prototype.idEncuesta>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>,
  ) {
    super(Encuesta, dataSource);
    this.publicacion = this.createHasOneRepositoryFactoryFor('publicacion', publicacionRepositoryGetter);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
  }
}
