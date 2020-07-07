import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DenunciaXusario,
  Usuario,
} from '../models';
import {DenunciaXusarioRepository} from '../repositories';

export class DenunciaXusarioUsuarioController {
  constructor(
    @repository(DenunciaXusarioRepository)
    public denunciaXusarioRepository: DenunciaXusarioRepository,
  ) { }

  @get('/denuncia-xusarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to DenunciaXusario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof DenunciaXusario.prototype.idDenunciaXusuario,
  ): Promise<Usuario> {
    return this.denunciaXusarioRepository.usuario(id);
  }
}
