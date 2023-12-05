import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};

  constructor(private http: HttpClient) {}

  public loadTranslations(url: string): Observable<void> {
    return this.http.get<any>(url).pipe(
      map((data) => {
        this.translations = data;
      })
    );
  }

  public translate(key: string, field: string = 'name'): string {
    return this.translations[key] && this.translations[key][field] || key;
  }
}
