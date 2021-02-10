import { TestBed } from '@angular/core/testing';

import { StatusCrudService } from './status-crud.service';

describe('StatusCrudService', () => {
  let service: StatusCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
