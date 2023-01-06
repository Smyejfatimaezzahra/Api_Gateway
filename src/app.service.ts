import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy   } from '@nestjs/microservices';
import { LoginDTO } from './dto/login.dto';
import { ClubDTO} from './dto/club.dto';
import { StadDTO } from './dto/stad.dto';

@Injectable()
export class AppService {
  // to notify the other service that an action was happened
  constructor(
    @Inject('Players_Teams') private playerTeams: ClientProxy,
    @Inject('Pitches') private pitches: ClientProxy,
    
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  login(dto:LoginDTO){
    var token='';
    if (dto.email!='' && dto.password!='') token= "jwt:AsBIw568ZKZD6AD44A599DJAD88asFGH0S7";
     this.playerTeams.emit('logged_in',token);
  }

  addClub(club:ClubDTO){
       this.pitches.send('add_club',club);
  }
  findAllClubs(){
    this.pitches.send('find_all_clubs',[]);
  }

  
  addStad(stad:StadDTO){
    this.pitches.emit('add_stad',stad);
}
findAllStads(){
 this.pitches.emit('find_all_stads',[]);
}
}
