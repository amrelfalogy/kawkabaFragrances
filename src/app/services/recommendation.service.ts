import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getRecommendations(perfumeName: string): Observable<any> {
    console.log('Requesting recommendations for:', perfumeName);
    return this.http
      .post<any>(`${this.apiUrl}/recommend`, { perfumeName })
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          throw error;
        })
      );
  }
}
