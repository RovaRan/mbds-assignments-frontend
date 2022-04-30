import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Matiere } from '../models/matiere.model';

@Injectable({
    providedIn: 'root'
})

export class MatieresService {

    // url = "http://localhost:8010/api/matieres";
    url = "https://tpangularapi.herokuapp.com/api/matieres";

    constructor(private http: HttpClient) {}

    // Recupere la liste des matieres
    getMatieres(): Observable<any> {
        return this.http.get<any>(this.url);
    }

    addMatiere(matiere:Matiere):Observable<any> {
        return this.http.post<Matiere>(this.url, matiere);
    }

    getMatiere(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`)
    }

    update(matiere:Matiere) {
        return this.http.put<Matiere>(this.url, matiere);
    }
}