import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './dadatatoken';
import { DadataSuggestions } from './dadata.interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  #apiUrl = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`;
  #http = inject(HttpClient);

  getSuggection(query: string) {
    return this.#http
      .post<{ suggestions: DadataSuggestions[] }>(
        this.#apiUrl,
        { query },
        { headers: { Authorization: `Token ${DADATA_TOKEN}` } }
      )
      .pipe(
        map((res) => {

          return res.suggestions
          // return Array.from(
          //   new Set(
          //     res.suggestions.map((suggestions) => {
          //       return suggestions.data.city;
          //     })
          //   )
          // );
        }
        )
      );
  }
}
