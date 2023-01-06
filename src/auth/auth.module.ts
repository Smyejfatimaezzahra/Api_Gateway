import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { config } from 'process';
import jwtConfig from 'src/config/app.config';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtStrategy } from 'src/strategies/jwt.strategy';
import appConfig from 'src/config/app.config';
import { JwtAuthGuard } from 'src/guards/jwt.auth.gard';
import { facebookStrategy } from 'src/strategies/strategy.facebook';

@Module({
  //  
    imports:[ UsersModule,
      PassportModule,
      JwtModule.register({
      
      
      }),
    
    
    
    ],
  providers: [AuthService,jwtStrategy,facebookStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
