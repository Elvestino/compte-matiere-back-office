import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FournisseurModule } from './modules/fournisseur/fournisseur.module';
import { Fournisseur } from './modules/fournisseur/entities/fournisseur.entity';
import { AnneeModule } from './modules/annee/annee.module';
import { Annee } from './modules/annee/entities/annee.entity';
import { ServiceModule } from './modules/service/service.module';
import { Service } from './modules/service/entities/service.entity';
//import { OrdreModule } from './modules/ordre/ordre.module';
import { Ordre } from './modules/ordre/entities/ordre.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gestionmateriels',
      synchronize: true,
      entities: [User, Fournisseur, Annee, Service, Ordre],
    }),
    UsersModule,
    AuthModule,
    FournisseurModule,
    AnneeModule,
    ServiceModule,
    //OrdreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
