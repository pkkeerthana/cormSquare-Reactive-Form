import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ApiService {

    constructor(
        private http:HttpClient
    ){}

    getCountries(){
        return this.http.get('https://recruit.cormsquare.com/api/test/countries');
    }

    getState(id){
        return this.http.get('https://recruit.cormsquare.com/api/test/states/'+id);
    }

    getCity(id){
        return this.http.get('https://recruit.cormsquare.com/api/test/cities/'+id);
    }
}