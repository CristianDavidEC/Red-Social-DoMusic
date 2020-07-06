import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MusicoProfesional,
  Banda,
} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

export class MusicoProfesionalBandaController {
  constructor(
    @repository(MusicoProfesionalRepository)
    public musicoProfesionalRepository: MusicoProfesionalRepository,
  ) { }

  @get('/musico-profesionals/{id}/banda', {
    responses: {
      '200': {
        description: 'Banda belonging to MusicoProfesional',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Banda)},
          },
        },
      },
    },
  })
  async getBanda(
    @param.path.string('id') id: typeof MusicoProfesional.prototype.idMusicoProfesional,
  ): Promise<Banda> {
    return this.musicoProfesionalRepository.banda(id);
  }
}
