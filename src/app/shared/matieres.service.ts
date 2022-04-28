import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Matiere } from '../models/matiere.model';

@Injectable({
    providedIn: 'root'
})

export class MatieresService {

    url = "http://localhost:8010/api/matieres";

    constructor(private http: HttpClient) {}

    // // Recupere la liste des matieres
    // getMatieres(): Observable<Matiere[]> {
    //     return this.http.get<Matiere[]>(this.url)
    // }

    // Recupere la liste des matieres
    getMatieres(): Observable<any> {
        return this.http.get<any>(this.url)
    }

    addAssignment(matiere:Matiere):Observable<any> {
        return this.http.post<Matiere>(this.url, matiere);
    }
}