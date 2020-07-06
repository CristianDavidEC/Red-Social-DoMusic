import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongadb',
  connector: 'mongodb',
  url: 'mongodb+srv://DoMusic:ndTZ9VoLaVvhPfxq@cluster0-m4vzk.mongodb.net/DoMusicDB?retryWrites=true&w=majority',
  host: 'cluster0-m4vzk.mongodb.net',
  port: 27017,
  user: 'DoMusic',
  password: 'ndTZ9VoLaVvhPfxq',
  database: 'DoMusicDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongadbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongadb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongadb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
