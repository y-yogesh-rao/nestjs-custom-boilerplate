import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
    port: 3306,
    logging: true,
    type: 'mysql',
    username: 'root',
    host: 'localhost',
    synchronize: true,
    password: 'qss@2022',
    database: 'mediumclone',
    entities: [__dirname + '/models' + '/**/*.entity{.ts,.js}'],
}

export default databaseConfig;