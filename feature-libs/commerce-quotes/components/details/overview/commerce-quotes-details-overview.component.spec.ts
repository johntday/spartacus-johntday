import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Quote,
  QuoteActionType,
  QuoteState,
} from '@spartacus/commerce-quotes/root';
import {
  I18nTestingModule,
  QueryState,
  TranslationService,
} from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { CommerceQuotesFacade } from 'feature-libs/commerce-quotes/root/facade/commerce-quotes.facade';
import { Observable, of } from 'rxjs';
import { CommerceQuotesDetailsOverviewComponent } from './commerce-quotes-details-overview.component';
import createSpy = jasmine.createSpy;

const mockCartId = '1234';
const mockAction = { type: QuoteActionType.CREATE, isPrimary: true };
const mockQuote: Quote = {
  allowedActions: [mockAction],
  cartId: mockCartId,
  code: '00001233',
  creationTime: new Date('2022-06-07T11:45:42+0000'),
  description: 'Quote Description',
  expirationTime: new Date('2022-07-07T23:59:59+0000'),
  updatedTime: new Date('2022-06-09T13:31:36+0000'),
  previousEstimatedTotal: {
    currencyIso: 'USD',
    formattedValue: '$0.00',
    value: 0,
  },
  state: QuoteState.BUYER_ORDERED,
};

export class MockCommerceQuotesFacade implements Partial<CommerceQuotesFacade> {
  getQuoteDetails(): Observable<QueryState<Quote>> {
    return of({ data: mockQuote, loading: false, error: false });
  }
  setSort = createSpy();
  setCurrentPage = createSpy();
}

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(key);
  }
}

@Component({
  selector: 'cx-commerce-quotes-action-links',
  template: '',
})
export class MockCommerceQuotesActionLinksComponent {}

describe('CommerceQuotesDetailsOverviewComponent', () => {
  let fixture: ComponentFixture<CommerceQuotesDetailsOverviewComponent>;
  let component: CommerceQuotesDetailsOverviewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CardModule, RouterTestingModule],
      declarations: [
        CommerceQuotesDetailsOverviewComponent,
        MockCommerceQuotesActionLinksComponent,
      ],
      providers: [
        {
          provide: CommerceQuotesFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceQuotesDetailsOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display overview if it is available', () => {
    //when
    fixture.detectChanges();

    //then
    const quoteOverviewElement = fixture.debugElement.query(
      By.css('.cx-quote-overview')
    );
    expect(quoteOverviewElement.nativeElement.innerHTML).toBeDefined();
  });

  it('should display titles and content in card if details are available', () => {
    //when
    fixture.detectChanges();

    //then
    const titleElements = fixture.debugElement.queryAll(
      By.css('.cx-card-title')
    );
    const contentElements = fixture.debugElement.queryAll(
      By.css('.cx-card-label')
    );
    const descriptionElement = fixture.debugElement.query(
      By.css('.truncated-text')
    );
    expect(titleElements.length).toEqual(7);
    expect(contentElements.length).toEqual(6);
    expect(descriptionElement.nativeElement.innerHTML).toBeDefined();
  });

  it('should return object with title and text if value is defined when getCardContent', () => {
    //given
    const value = 'test';
    const titleKey = 'key';
    const expected = { title: 'key', text: [value] };

    //then
    component.getCardContent(value, titleKey).subscribe((result) => {
      expect(result).toEqual(expected);
    });
  });

  it('should return object with title and placeholder if value is not defined defined when getCardContent', () => {
    //given
    const value = null;
    const titleKey = 'key';
    const expected = { title: 'key', text: ['-'] };

    //then
    component.getCardContent(value, titleKey).subscribe((result) => {
      expect(result).toEqual(expected);
    });
  });
});