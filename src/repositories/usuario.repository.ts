import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Aficionado, MusicoProfesional, Banda, Administrador} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AficionadoRepository} from './aficionado.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';
import {BandaRepository} from './banda.repository';
import {AdministradorRepository} from './administrador.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly aficionado: HasOneRepositoryFactory<Aficionado, typeof Usuario.prototype.idUsuario>;

  public readonly musicoProfesional: HasOneRepositoryFactory<MusicoProfesional, typeof Usuario.prototype.idUsuario>;

  public readonly banda: HasOneRepositoryFactory<Banda, typeof Usuario.prototype.idUsuario>;

  public readonly administrador: HasOneRepositoryFactory<Administrador, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('AficionadoRepository') protected aficionadoRepositoryGetter: Getter<AficionadoRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Usuario, dataSource);
    this.administrador = this.createHasOneRepositoryFactoryFor('administrador', administradorRepositoryGetter);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.banda = this.createHasOneRepositoryFactoryFor('banda', bandaRepositoryGetter);
    this.registerInclusionResolver('banda', this.banda.inclusionResolver);
    this.musicoProfesional = this.createHasOneRepositoryFactoryFor('musicoProfesional', musicoProfesionalRepositoryGetter);
    this.registerInclusionResolver('musicoProfesional', this.musicoProfesional.inclusionResolver);
    this.aficionado = this.createHasOneRepositoryFactoryFor('aficionado', aficionadoRepositoryGetter);
    this.registerInclusionResolver('aficionado', this.aficionado.inclusionResolver);
  }
}
