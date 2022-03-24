export class Assignment {
  _id?:string;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;

  // todo: A modifier en non optionnel
  auteur?: string; 
  matiere?: string; 
  note?: number; 
  remarque?: string;
}
