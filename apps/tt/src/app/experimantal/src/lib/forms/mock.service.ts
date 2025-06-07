import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Features {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getAddresses() {
    return of([
      {
        city: 'Moskow',
        street: 'Beskydnikovskii bulvar',
        build: 21.2,
        apartment: 17,
      },
      {
        city: 'Arzamas',
        street: 'Revolution',
        build: 27,
        apartment: 55,
      },
    ]);
  }
  getFeatures(): Observable<Features[]> {
    return of([
      {
        code: 'lift',
        label: 'Подьем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }
}
