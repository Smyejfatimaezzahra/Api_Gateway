import { Module } from '@nestjs/common';
import {ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: 'Players_Teams',
       transport: Transport.TCP,
       options: {
        port: 3001,
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
        port: 3003,
      },
     },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
