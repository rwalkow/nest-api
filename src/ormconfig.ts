export = {
  type: 'mysql',
  host: '192.168.1.201',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: true,
  migrationsRun: false,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};
