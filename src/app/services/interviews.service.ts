import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateInterview, IInterviewResponse } from '../shared/models/interviewsdomain.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  private readonly apiUrl: string = environment.API_URL;
  constructor(private readonly http: HttpClient) {}

  getInterviewsList(): Observable<IInterviewResponse[]> {
    return this.http.get<IInterviewResponse[]>(`${this.apiUrl}/interviews/all`);
  }

  getInterviewById(id: number): Observable<IInterviewResponse> {
    return this.http.get<IInterviewResponse>(`${this.apiUrl}/interviews/${id}`);
  }

  editInterviewById(
    id: number,
    status: string
  ): Observable<IInterviewResponse> {
    return this.http.patch<IInterviewResponse>(
      `${this.apiUrl}/interviews/update-status/${id}?newStatus=${status}`, ''
      
    );
  }

  deleteInterviewById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/interviews/delete/${id}`)
  }

  createNewInterview(jopApplicationId: number, body: ICreateInterview): Observable<IInterviewResponse> {
    return this.http.post<IInterviewResponse>(`${this.apiUrl}/interviews/add/${jopApplicationId}`, body)
  }
}
