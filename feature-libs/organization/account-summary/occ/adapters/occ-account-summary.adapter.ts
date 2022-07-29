import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { AccountSummaryAdapter, ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER, ACCOUNT_SUMMARY_NORMALIZER } from '@spartacus/organization/account-summary/core';
import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';

@Injectable()
export class OccAccountSummaryAdapter implements AccountSummaryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) { }

  getAccountSummary(userId: string, unitCode: string): Observable<AccountSummaryDetails> {
    return this.http.get<AccountSummaryDetails>(this.getAccountSummaryEndPoint(userId, unitCode)).pipe(
      this.converter.pipeable(ACCOUNT_SUMMARY_NORMALIZER)
    );
  }

  getDocumentList(userId: string, unitCode: string, params: DocumentQueryParams): Observable<AccountSummaryList> {
    return this.http.get<AccountSummaryList>(this.getDocumentListEndPoint(userId, unitCode, params)).pipe(
      this.converter.pipeable(ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER)
    );
  }

  private getAccountSummaryEndPoint(userId: string, orgUnitId: string): string {
    return this.occEndpoints.buildUrl('accountSummary', {
      urlParams: { userId, orgUnitId },
    });
  }

  private getDocumentListEndPoint(userId: string, orgUnitId: string, queryParams: DocumentQueryParams): string {
    return this.occEndpoints.buildUrl('accountSummaryDocument', {
      urlParams: { userId, orgUnitId },
      queryParams,
    });
  }
}
