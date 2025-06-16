import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KycService } from '../../services/kyc.service';
import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockKycService: jasmine.SpyObj<KycService>;

  beforeEach(async () => {
    mockKycService = jasmine.createSpyObj<KycService>('KycService', [
      'getAllCustomers',
      'getServiceHealth',
      'exportCustomerToPdf',
      'removeCustomerSelfie'
    ]);

    mockKycService.getAllCustomers.and.returnValue(of([]));
    mockKycService.getServiceHealth.and.callFake((service: string) => of({ status: 'Up' }));
    mockKycService.exportCustomerToPdf.and.returnValue(of(new Blob()));
    mockKycService.removeCustomerSelfie.and.returnValue(of('Selfie removed'));

    await TestBed.configureTestingModule({
      imports: [
        TableComponent,             // ✅ standalone component must be imported, not declared
        HttpClientTestingModule     // ✅ keep testing module
      ],
      providers: [
        { provide: KycService, useValue: mockKycService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchCustomers on init', () => {
    expect(mockKycService.getAllCustomers).toHaveBeenCalled();
  });

  it('should call checkServiceHealth on init', () => {
    expect(mockKycService.getServiceHealth).toHaveBeenCalledWith('email');
    expect(mockKycService.getServiceHealth).toHaveBeenCalledWith('kyc');
  });
});
