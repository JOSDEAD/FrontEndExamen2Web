import { TestBed, inject } from '@angular/core/testing';

import { InventariosService } from './inventarios.service';

describe('InventariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventariosService]
    });
  });

  it('should be created', inject([InventariosService], (service: InventariosService) => {
    expect(service).toBeTruthy();
  }));
});
