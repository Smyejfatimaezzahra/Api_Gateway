import { StadDTO } from "./stad.dto";

export class ClubDTO{
    _id:string;
    name:string;
     description:string;
    adresse:string;
    country:string;
    city:string;
    region:string;
    phone:string;
    stads:StadDTO[];

}