import { TestBed } from '@angular/core/testing';

import { FormListService } from './form-list.service';

describe('FormListService', () => {
  let service: FormListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
