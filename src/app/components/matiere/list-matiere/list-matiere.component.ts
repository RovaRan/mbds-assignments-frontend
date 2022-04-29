import { Component, OnInit } from '@angular/core';
import { matSelectAnimations } from '@angular/material/select';
import { Matiere } from 'src/app/models/matiere.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { UtilisateurService } from 'src/app/shared/utilisateur.service';

@Component({
  selector: 'list-add-assignment',
  templateUrl: './list-matiere.component.html',
  styleUrls: ['./list-matiere.component.css'],
})
export class ListMatiereComponent implements OnInit {

    matieres: Matiere[];
    columnsToDisplay = ['nom', 'prof', 'modifier'];


    constructor(private matiereService: MatieresService, private utilisateurService: UtilisateurService){}

    ngOnInit(): void {
      this.getMatieres();

      this.buildMatieresList(); // Utiliser le nom du prof a la place de l'id
    }

    // Recuperer la liste des matières
    getMatieres() { 
      this.matiereService.getMatieres().subscribe((mats: any) => {
        this.matieres = mats.docs
      })
    }

    buildMatieresList() {
      // this.matieres.map(
      //   (value:any) => console.log(value)
      // )
    }
}