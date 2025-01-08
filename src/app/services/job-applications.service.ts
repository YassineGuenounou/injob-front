import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IJobApplicationResponse } from "../shared/models/job-applications-domain.model";

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsService {
  private readonly apiUrl: string = environment.API_URL;
  constructor(private readonly http: HttpClient) { }

  getJobApplicationsList(): Observable<IJobApplicationResponse[]> {
    return this.http.get<IJobApplicationResponse[]>(`${this.apiUrl}/jobapplies/all`);
  }

  getJobApplicationById(id: number): Observable<IJobApplicationResponse> {
    return this.http.get<IJobApplicationResponse>(`${this.apiUrl}/jobapplies/${id}`);
  }

  editJobApplicationById(
    id: number,
    status: string
  ): Observable<IJobApplicationResponse> {
    return this.http.patch<IJobApplicationResponse>(
      `${this.apiUrl}/jobapplies/update-status/${id}?newStatus=${status}`, {}
    );
  }

  createNewJobApplication(id: number): Observable<IJobApplicationResponse> {
    return this.http.post<IJobApplicationResponse>(`${this.apiUrl}/jobapplies/add/${id}`, '')
  }
}
