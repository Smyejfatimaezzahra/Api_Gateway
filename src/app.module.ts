import { Module } from '@nestjs/common';
import {ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schemas';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt.auth.gard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pfa5'),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema
     },
     { name: User.name, schema: UserSchema
     }
    
    ]),
   
    ClientsModule.register([
      { 
        name: 'Players_Teams',
       transport: Transport.TCP,
       options: {
        port: 3003,
      }, 
    },
     { 
      name: 'Romes_Booking',
      transport: Transport.TCP,
      options: {
        port: 3002,
      },
     },
     { 
      name: 'Pitches',
      transport: Transport.TCP,
      options: {
        port: 3001,
      },
     },
    ]),
   
    UsersModule,
    AuthModule,
    
  ],
  
  controllers: [AppController],
  providers: [AppService,
    {
      provide:"APP_GUARD",
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}
