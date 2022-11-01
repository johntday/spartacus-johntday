import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';

import { CustomerTicketingCreateComponent } from './customer-ticketing-create.component';

describe('CustomerTicketingCreateComponent', () => {
  let component: CustomerTicketingCreateComponent;
  let fixture: ComponentFixture<CustomerTicketingCreateComponent>;

  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    openDialog(
      _caller: LAUNCH_CALLER,
      _openElement?: ElementRef,
      _vcr?: ViewContainerRef
    ) {
      return of();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCreateComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});