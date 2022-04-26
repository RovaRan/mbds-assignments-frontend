import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}