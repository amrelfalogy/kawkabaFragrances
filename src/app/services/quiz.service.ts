import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getRecommendations(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quiz`, data);
  }
}
