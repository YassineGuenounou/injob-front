import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJobOffers } from '../shared/models/joboffers.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class injobService {
  apiUrl: string = environment.API_URL;
  constructor(private readonly http: HttpClient) {}

  listJobOffers(): Observable<IJobOffers[]> {
    return this.http.get<IJobOffers[]>(`${this.apiUrl}/joboffers`);
  }

  getJobOfferById(id: number): Observable<IJobOffers> {
    return this.http.get<IJobOffers>(`${this.apiUrl}/joboffers/${id}`);
  }

  putOfferById(id: number, data: IJobOffers): Observable<IJobOffers> {
    return this.http.put<IJobOffers>(`${this.apiUrl}/joboffers/${id}`, data);
  }
}
