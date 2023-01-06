import { Body, Controller, Get, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { LoginDTO } from './dto/login.dto';
import { StadDTO } from './dto/stad.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
   
  @Get()
  Ftest(){
    return"hello";
  }
  @Post("stads")
  addstad(@Body() stad:StadDTO){
   return this.appService.addStad(stad);
  }

  @Post("clubs")
  addclub(@Body() stad:StadDTO){
   return this.appService.addStad(stad);
  }

  @Get("stads")
  findAllStads(){
   return this.appService.findAllStads();
  }
  @Get("clubs")
  findAllClubs(){
   return this.appService.findAllClubs();
  }

  @Put()
  test(@Body()t:LoginDTO){
  return this.appService.login(t);
   }
}
