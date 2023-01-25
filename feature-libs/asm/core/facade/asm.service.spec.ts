import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AsmCustomer360Response } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { take } from 'rxjs/operators';
import {
  AsmUi,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmActions } from '../store/actions/index';
import { AsmState, ASM_FEATURE } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmService } from './asm.service';

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'user@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
};

describe('AsmService', () => {
  let service: AsmService;
  let store: Store<AsmState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [AsmService],
    });

    service = TestBed.inject(AsmService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for customer search', () => {
    spyOn(store, 'dispatch').and.stub();
    const searchOptions: CustomerSearchOptions = { query: 'search term' };
    service.customerSearch(searchOptions);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerSearch(searchOptions)
    );
  });

  it('should return search result', () => {
    store.dispatch(
      new AsmActions.CustomerSearchSuccess(mockCustomerSearchPage)
    );

    let result: CustomerSearchPage;
    service
      .getCustomerSearchResults()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should return search result loading status', () => {
    let result: boolean;
    service
      .getCustomerSearchResultsLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(false);
  });

  it('should dispatch proper action for customer search reset', () => {
    spyOn(store, 'dispatch').and.stub();
    service.customerSearchReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerSearchReset()
    );
  });

  it('should dispatch proper action for update asm UI', () => {
    spyOn(store, 'dispatch').and.stub();
    const asmUi: AsmUi = {};
    service.updateAsmUiState(asmUi);
    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.AsmUiUpdate(asmUi)
    );
  });

  it('should get the AsmUi state', () => {
    const asmUi: AsmUi = { collapsed: false };
    store.dispatch(new AsmActions.AsmUiUpdate(asmUi));

    let result: AsmUi;
    service
      .getAsmUiState()
      .subscribe((value) => (result = value))
      .unsubscribe();
    expect(result).toEqual(asmUi);
  });

  it('should dispatch proper action for customer list customers search', () => {
    spyOn(store, 'dispatch').and.stub();
    const searchOptions: CustomerSearchOptions = {
      customerListId: 'mock-customer-list-id',
    };

    service.customerListCustomersSearch(searchOptions);

    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerListCustomersSearch(searchOptions)
    );
  });

  it('should return customer list customers search result', () => {
    store.dispatch(
      new AsmActions.CustomerListCustomersSearchSuccess(mockCustomerSearchPage)
    );
    let result: CustomerSearchPage;

    service
      .getCustomerListCustomersSearchResults()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should return customer list customers search result loading status', () => {
    let result: boolean;

    service
      .getCustomerListCustomersSearchResultsLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should dispatch proper action for customer list customers search reset', () => {
    spyOn(store, 'dispatch').and.stub();

    service.customerListCustomersSearchReset();

    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerListCustomersSearchReset()
    );
  });

  it('should dispatch an action to fetch customer 360 data', () => {
    spyOn(store, 'dispatch').and.stub();

    service.fetchCustomer360Data({
      queries: [],
      options: {
        userId: '',
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.Customer360Get({
        queries: [],
        options: {
          userId: '',
        },
      })
    );
  });

  it('should return customer 360 data', (done) => {
    const customer360Response: AsmCustomer360Response = {
      value: [],
    };

    store.dispatch(new AsmActions.Customer360GetSuccess(customer360Response));

    service
      .getCustomer360Data()
      .pipe(take(1))
      .subscribe((value) => {
        expect(value).toEqual(customer360Response);
        done();
      });
  });
});
