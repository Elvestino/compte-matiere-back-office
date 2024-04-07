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
import { FactureModule } from './modules/facture/facture.module';
import { Facture } from './modules/facture/entities/facture.entity';
import { FactureController } from './modules/facture/controller/facture.controller';
import { FactureService } from './modules/facture/service/facture.service';
import { QuitusModule } from './modules/quitus/quitus.module';
import { Quitus } from './modules/quitus/entities/quitus.entity';
import { QuitusController } from './modules/quitus/controller/quitus.controller';
import { QuitusService } from './modules/quitus/service/quitus.service';
import { EntreeModule } from './modules/entree/entree.module';
import { Entree } from './modules/entree/entities/entree.entity';
import { EntreeController } from './modules/entree/controller/entree.controller';
import { EntreeService } from './modules/entree/service/entree.service';
import { SortieModule } from './modules/sortie/sortie.module';
import { Sortie } from './modules/sortie/entities/sortie.entity';
import { SortieController } from './modules/sortie/controller/sortie.controller';
import { SortieService } from './modules/sortie/service/sortie.service';

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
      entities: [
        User,
        Fournisseur,
        Annee,
        Service,
        Ordre,
        Facture,
        Quitus,
        Entree,
        Sortie,
      ],
    }),

    TypeOrmModule.forFeature([
      User,
      Fournisseur,
      Annee,
      Service,
      Ordre,
      Quitus,
      Facture,
      Entree,
      Sortie,
    ]),
    UsersModule,
    AuthModule,
    FournisseurModule,
    AnneeModule,
    ServiceModule,
    OrdreModule,
    FactureModule,
    QuitusModule,
    EntreeModule,
    SortieModule,
  ],
  controllers: [
    AppController,
    OrdreController,
    AnneeController,
    ServiceController,
    FactureController,
    QuitusController,
    EntreeController,
    SortieController,
  ],
  providers: [
    AppService,
    OrdreService,
    AnneeService,
    ServiceService,
    FactureService,
    QuitusService,
    EntreeService,
    SortieService,
  ],
})
export class AppModule {}
