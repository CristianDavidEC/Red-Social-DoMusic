import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DenunciaXPubli,
  Usuario,
} from '../models';
import {DenunciaXPubliRepository} from '../repositories';

export class DenunciaXPubliUsuarioController {
  constructor(
    @repository(DenunciaXPubliRepository)
    public denunciaXPubliRepository: DenunciaXPubliRepository,
  ) { }

  @get('/denuncia-x-publis/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to DenunciaXPubli',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof DenunciaXPubli.prototype.idDenunciaXPubli,
  ): Promise<Usuario> {
    return this.denunciaXPubliRepository.usuario(id);
  }
}
