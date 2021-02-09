import { TestBed } from '@angular/core/testing';

import { CategorieCRUDService } from './categorie-crud.service';

describe('CategorieCRUDService', () => {
  let service: CategorieCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
