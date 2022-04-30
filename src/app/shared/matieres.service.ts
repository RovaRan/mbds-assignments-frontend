import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Matiere } from '../models/matiere.model';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class MatieresService {
    baseUrl = environment.apiUrl;
    url = this.baseUrl + "/matieres";

    constructor(private http: HttpClient) { }

    // Recupere la liste des matieres
    getMatieres(): Observable<any> {
        return this.http.get<any>(this.url);
    }

    addMatiere(matiere: Matiere): Observable<any> {
        return this.http.post<Matiere>(this.url, matiere);
    }

    getMatiere(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/${id}`)
    }

    update(matiere: Matiere): Observable<any> {
        console.log("update matiere")
        console.log(matiere);
        return this.http.put<Matiere>(this.url, matiere);
    }
}