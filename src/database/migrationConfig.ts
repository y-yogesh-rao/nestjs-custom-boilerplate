import { DataSource } from 'typeorm';

const migrationDatabaseConfig = new DataSource({
    port: 3306,
    logging: true,
    type: 'mysql',
    username: 'root',
    host: 'localhost',
    synchronize: true,
    password: 'qss@2022',
    database: 'mediumclone',
    // migrations: ['src/migrations/**/*{.ts,.js}'],
    entities: [__dirname + '/models' + '/**/*.entity{.ts,.js}'],
})

export default migrationDatabaseConfig;