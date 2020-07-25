import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Administrador, Aficionado, Banda, MusicoProfesional, DenunciaXusario, DenunciaXPubli, Mensaje, Notificacion, Comentario} from '../models';
import {MongadbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AdministradorRepository} from './administrador.repository';
import {AficionadoRepository} from './aficionado.repository';
import {BandaRepository} from './banda.repository';
import {MusicoProfesionalRepository} from './musico-profesional.repository';
import {DenunciaXusarioRepository} from './denuncia-xusario.repository';
import {DenunciaXPubliRepository} from './denuncia-x-publi.repository';
import {MensajeRepository} from './mensaje.repository';
import {NotificacionRepository} from './notificacion.repository';
import {ComentarioRepository} from './comentario.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof Usuario.prototype.idUsuario>;

  public readonly aficionado: BelongsToAccessor<Aficionado, typeof Usuario.prototype.idUsuario>;

  public readonly banda: BelongsToAccessor<Banda, typeof Usuario.prototype.idUsuario>;

  public readonly musicoProfesional: BelongsToAccessor<MusicoProfesional, typeof Usuario.prototype.idUsuario>;

  public readonly denunciaXusarios: HasManyRepositoryFactory<DenunciaXusario, typeof Usuario.prototype.idUsuario>;

  public readonly denunciaXPublis: HasManyRepositoryFactory<DenunciaXPubli, typeof Usuario.prototype.idUsuario>;

  public readonly mensaje: BelongsToAccessor<Mensaje, typeof Usuario.prototype.idUsuario>;

  public readonly notificacion: BelongsToAccessor<Notificacion, typeof Usuario.prototype.idUsuario>;

  public readonly comentario: BelongsToAccessor<Comentario, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.mongadb') dataSource: MongadbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AficionadoRepository') protected aficionadoRepositoryGetter: Getter<AficionadoRepository>, @repository.getter('BandaRepository') protected bandaRepositoryGetter: Getter<BandaRepository>, @repository.getter('MusicoProfesionalRepository') protected musicoProfesionalRepositoryGetter: Getter<MusicoProfesionalRepository>, @repository.getter('DenunciaXusarioRepository') protected denunciaXusarioRepositoryGetter: Getter<DenunciaXusarioRepository>, @repository.getter('DenunciaXPubliRepository') protected denunciaXPubliRepositoryGetter: Getter<DenunciaXPubliRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>, @repository.getter('NotificacionRepository') protected notificacionRepositoryGetter: Getter<NotificacionRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.comentario = this.createBelongsToAccessorFor('comentario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentario', this.comentario.inclusionResolver);
    this.notificacion = this.createBelongsToAccessorFor('notificacion', notificacionRepositoryGetter,);
    this.registerInclusionResolver('notificacion', this.notificacion.inclusionResolver);
    this.mensaje = this.createBelongsToAccessorFor('mensaje', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensaje', this.mensaje.inclusionResolver);
    this.denunciaXPublis = this.createHasManyRepositoryFactoryFor('denunciaXPublis', denunciaXPubliRepositoryGetter,);
    this.registerInclusionResolver('denunciaXPublis', this.denunciaXPublis.inclusionResolver);
    this.denunciaXusarios = this.createHasManyRepositoryFactoryFor('denunciaXusarios', denunciaXusarioRepositoryGetter,);
    this.registerInclusionResolver('denunciaXusarios', this.denunciaXusarios.inclusionResolver);
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
