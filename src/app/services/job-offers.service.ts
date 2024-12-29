import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJobOfferResponse } from '../shared/models/jobs-offers-domain.model';

@Injectable({
  providedIn: 'root',
})
export class JobOffersService {
  private readonly apiUrl: string = environment.API_URL;
  constructor(private readonly http: HttpClient) {}

  getAllJobOffers(): Observable<IJobOfferResponse[]> {
    return this.http.get<IJobOfferResponse[]>(`${this.apiUrl}/joboffers`);
  }

  getJobOfferById(id: number): Observable<IJobOfferResponse> {
    return this.http.get<IJobOfferResponse>(`${this.apiUrl}/joboffers/${id}`);
  }

  editJobOfferById(
    id: number,
    data: IJobOfferResponse
  ): Observable<IJobOfferResponse> {
    return this.http.put<IJobOfferResponse>(
      `${this.apiUrl}/joboffers/${id}`,
      data
    );
  }
}
