import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { KycService } from './services/kyc.service';
import { of } from 'rxjs';

// Mock service to prevent actual HTTP calls
const mockKycService = {
  getAllCustomers: jasmine.createSpy('getAllCustomers').and.returnValue(of([])),
  getServiceHealth: jasmine.createSpy('getServiceHealth').and.returnValue(of({ status: 'Up' })),
  exportCustomerToPdf: jasmine.createSpy('exportCustomerToPdf').and.returnValue(of(new Blob())),
  removeCustomerSelfie: jasmine.createSpy('removeCustomerSelfie').and.returnValue(of({}))
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        TableComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: KycService, useValue: mockKycService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
