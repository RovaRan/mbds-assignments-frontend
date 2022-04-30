import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class UtilisateurService {

    url = "http://localhost:8010/api/users";

    constructor(private http: HttpClient) {}

    // // Recupere la liste des utilisateurs
    getUtilisateur(): Observable<any> {
        return this.http.get<any>(this.url)
    }
    
    getProfs(): Observable<any> {
        return this.http.get<any>(this.url)
            .pipe( map( (val: any) => val.docs ))
    }

    getUtilisateurById(id: string) {
        return this.http.get<any>(`${this.url}/${id}`)
    }

    getUtilisateurNom(id: string): string {
        let nom = 'ndrema'
        this.getUtilisateurById(id).subscribe(v => {
            console.log(v.nom) // Efa mety fa tsy mety lasa ary amle liste
            nom = v.nom
        })
        return nom;        
    }
}