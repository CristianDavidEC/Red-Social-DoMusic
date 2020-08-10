import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
// import {repository} from '@loopback/repository';
import {
  HttpErrors,





  param, post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/carga-archivos-llaves';
import {MusicoProfesional} from '../models';
import {MusicoProfesionalRepository} from '../repositories';

// import {Aficionado} from '../models';
// import {AficionadoRepository} from '../repositories';
// import {Banda} from '../models';
// import {BandaRepository} from '../repositories';


export class CargarArchivosController {
  constructor(
    @repository(MusicoProfesionalRepository)
    private MusicoProfesionalRepository: MusicoProfesionalRepository
  ) {

  }
  /**
   *
   * @param response
   * @param request
   */
  @post('/publicidadImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Advertising Image',
      },
    },
  })
  async advertisingImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicidadImagePath = path.join(__dirname, UploadFilesKeys.ADVERTISING_IMAGE_PATH);
    let res = await this.StoreFileToPath(publicidadImagePath, UploadFilesKeys.ADVERTISING_IMAGE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }


  @post('/musicoFotoPerfil', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'MusicoProfesional Photo',
      },
    },
  })
  async musicoProfesionalPhotoUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('musicoProfesionalId') musicoProfesionalId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const musicoProfesionalPhotoPath = path.join(__dirname, UploadFilesKeys.MUSICO_PHOTO_PATH);
    let res = await this.StoreFileToPath(musicoProfesionalPhotoPath, UploadFilesKeys.MUSICO_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let mp: MusicoProfesional = await this.MusicoProfesionalRepository.findById(musicoProfesionalId);
        if (mp) {
          mp.image = filename;
          this.MusicoProfesionalRepository.replaceById(musicoProfesionalId, mp);
          return {filename: filename};
        }
      }
    }
    return res;
  }

  @post('/archivoPublicacion', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo de la Publicacion',
      },
    },
  })
  async publicacionFileUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicacionFilePath = path.join(__dirname, UploadFilesKeys.PUBLICATION_FILE_PATH);
    let res = await this.StoreFileToPath(publicacionFilePath, UploadFilesKeys.PUBLICATION_FILE_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  @post('/fotoAficionado', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo de la Publicacion',
      },
    },
  })
  async fotoAficionado(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicacionFilePath = path.join(__dirname, UploadFilesKeys.AFICIONADO_PHOTO_PATH);
    let res = await this.StoreFileToPath(publicacionFilePath, UploadFilesKeys.AFICIONADO_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  @post('/archivoDenunciaUsuario', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo de la Publicacion',
      },
    },
  })
  async denunciaUsuario(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicacionFilePath = path.join(__dirname, UploadFilesKeys.DENUNCIAS);
    let res = await this.StoreFileToPath(publicacionFilePath, UploadFilesKeys.AFICIONADO_PHOTO_FIELDNAME, request, response, UploadFilesKeys.DOCUMENTO);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }



  @post('/archivoFotoMusico', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo de la Publicacion',
      },
    },
  })
  async CargaFotoMusico(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const pefilMusicoFilePath = path.join(__dirname, UploadFilesKeys.MUSICO_PHOTO_PATH);
    let res = await this.StoreFileToPath(pefilMusicoFilePath, UploadFilesKeys.MUSICO_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  @post('/archivoFotoBanda', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Archivo de la Publicacion',
      },
    },
  })
  async CargaFotoBanda(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const pefilMusicoFilePath = path.join(__dirname, UploadFilesKeys.BANDA_PHOTO_PATH);
    let res = await this.StoreFileToPath(pefilMusicoFilePath, UploadFilesKeys.BANDA_PHOTO_FIELDNAME, request, response, UploadFilesKeys.IMAGE_ACCEPTED_EXT);
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }



  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path)
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('Este foramato no tiene soporte'));
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}


