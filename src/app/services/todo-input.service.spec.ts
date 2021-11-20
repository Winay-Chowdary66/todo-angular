import { TestBed } from '@angular/core/testing';

import { TodoInputService } from './todo-input.service';

describe('TodoInputService', () => {
  let service: TodoInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
