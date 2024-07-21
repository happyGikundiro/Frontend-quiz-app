import { TestBed } from '@angular/core/testing';

import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default mode as "null"', () => {
    expect(service.darkMode()).toBe('null');
  });

  it('should toggle mode from "null" to "dark"', () => {
    service.handleMode();
    expect(service.darkMode()).toBe('dark');
  });

  it('should toggle mode from "dark" to "null"', () => {
    service.handleMode();
    service.handleMode(); 
    expect(service.darkMode()).toBe('null');
  });
});
