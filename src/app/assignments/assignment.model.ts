export class Assignment {
  _id?:string;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  etudiant: any; // A verifier 
  matiere: any; // A vérifier
  note: number 
}
