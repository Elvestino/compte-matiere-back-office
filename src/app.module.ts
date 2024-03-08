import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FournisseurModule } from './modules/fournisseur/fournisseur.module';
import { Fournisseur } from './modules/fournisseur/entities/fournisseur.entity';
import { AnneeModule } from './modules/annee/annee.module';
import { Annee } from './modules/annee/entities/annee.entity';
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
      entities: [User, Fournisseur, Annee],
    }),
    UsersModule,
    AuthModule,
    FournisseurModule,
    TypeOrmModule.forFeature([User, Fournisseur, Annee]),
    AnneeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
