import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Evento, EventoRelations, Publicacion} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionRepository} from './publicacion.repository';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.idEvento,
  EventoRelations
> {

  public readonly publicacion: HasOneRepositoryFactory<Publicacion, typeof Evento.prototype.idEvento>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>,
  ) {
    super(Evento, dataSource);
    this.publicacion = this.createHasOneRepositoryFactoryFor('publicacion', publicacionRepositoryGetter);
    this.registerInclusionResolver('publicacion', this.publicacion.inclusionResolver);
  }
}
