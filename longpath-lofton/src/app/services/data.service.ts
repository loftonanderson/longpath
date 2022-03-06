import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    public getData(): Observable<City[]> {
        return this.http.get<City[]>('../../assets/data/cities.json');
    }
}