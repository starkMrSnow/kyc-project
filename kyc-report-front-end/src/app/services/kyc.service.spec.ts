import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KycService } from './kyc.service';

describe('KycService', () => {
  let service: KycService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KycService]
    });
    service = TestBed.inject(KycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
