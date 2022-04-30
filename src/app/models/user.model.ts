export class User {
  _id?:string;
  //id!:number;
  nom!:string;
  photoUrl!:string;
  type!:string;
}

export class FullUser{
  nom!:string;
  photoUrl!:string;
  type!:string;
  identifiant!:string;
  motDePasse!:string;
}

export class UserLogin{
  identifiant!:string;
  motDePasse!:string;
  derniereConnexion!:Date;
  user:User;
  accessToken:string;
}