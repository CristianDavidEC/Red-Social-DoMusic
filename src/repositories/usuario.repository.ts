import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Usuario, UsuarioRelations, Administrador, Aficionado, Banda, MusicoProfesional} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AdministradorRepository} from './administrador.repository';
import {AficionadoRepository} from './aficionado.repository';
import {BandaRepository} from './banda.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Usuario.prototype.idUsuario>;

  public readonly aficionado: BelongsToAccessor<Aficionado, typeof Usuario.prototype.idUsuario>;

  public readonly banda: BelongsToAccessor<Banda, typeof Usuario.prototype.idUsuario>;

  public readonly musicoProfesional: BelongsToAccessor<MusicoProfesional, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AficionadoRepository') protected aficionadoRepositoryGetter: Getter<AficionadoRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>,
  ) {
    super(Usuario, dataSource);
    this.musicoProfesional = this.createBelongsToAccessorFor('musicoProfesional', musicoProfesionalRepositoryGetter,);
    this.registerInclusionResolver('musicoProfesional', this.musicoProfesional.inclusionResolver);
    this.banda = this.createBelongsToAccessorFor('banda', bandaRepositoryGetter,);
    this.registerInclusionResolver('banda', this.banda.inclusionResolver);
    this.aficionado = this.createBelongsToAccessorFor('aficionado', aficionadoRepositoryGetter,);
    this.registerInclusionResolver('aficionado', this.aficionado.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
