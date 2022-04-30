import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class UtilisateurService {

    baseUrl = environment.apiUrl;
    url = this.baseUrl + "/users";

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

}