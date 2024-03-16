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
import { Ordre } from './modules/ordre/entities/ordre.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdreModule } from './modules/ordre/ordre.module';
import { OrdreController } from './modules/ordre/controller/ordre.controller';
import { AnneeController } from './modules/annee/controller/annee.controller';
import { ServiceController } from './modules/service/controller/service.controller';
import { OrdreService } from './modules/ordre/service/ordre.service';
import { AnneeService } from './modules/annee/service/annee.service';
import { ServiceService } from './modules/service/service/service.service';
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
    TypeOrmModule.forFeature([User, Fournisseur, Annee, Service, Ordre]),
    UsersModule,
    AuthModule,
    FournisseurModule,
    AnneeModule,
    ServiceModule,
    OrdreModule,
  ],
  controllers: [
    AppController,
    OrdreController,
    AnneeController,
    ServiceController,
  ],
  providers: [AppService, OrdreService, AnneeService, ServiceService],
})
export class AppModule {}
