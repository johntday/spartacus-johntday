import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {
  CmsPageAdapter,
  CmsStructureConfigService,
  CmsStructureModel,
  PageContext,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ContentfulCmsPageConnector {
  constructor(
    protected cmsPageAdapter: CmsPageAdapter,
    protected cmsStructureConfigService: CmsStructureConfigService
  ) {}

  /**
   * Returns an observable with the page structure. The page structure is
   * typically loaded from a backend, but can also be returned from static
   * configuration (see `CmsStructureConfigService`).
   */
  get(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService
      .shouldIgnoreBackend(pageContext.id)
      .pipe(
        switchMap((loadFromConfig) => {
          // console.log(
          //   'ContentfulCmsPageConnector.get',
          //   pageContext.id,
          //   loadFromConfig
          // );
          if (!loadFromConfig) {
            return this.cmsPageAdapter.load(pageContext).pipe(
              catchError((error) => {
                if (
                  error instanceof HttpErrorResponse &&
                  error.status === 400
                ) {
                  return of({});
                } else {
                  return throwError(error);
                }
              })
              // tap((page) => {
              //   console.log('ContentfulCmsPageConnector.get.cmsPageAdapter.load', pageContext.id, page);
              //   console.log(JSON.stringify(page, null, 2));
              // })
            );
          } else {
            return of({});
          }
        }),
        switchMap((page) => this.mergeDefaultPageStructure(pageContext, page))
      );
  }

  /**
   *
   * Merge default page structure to the given `CmsStructureModel`.
   * This is beneficial for a fast setup of the UI without necessary
   * fine-grained CMS setup.
   */
  private mergeDefaultPageStructure(
    pageContext: PageContext,
    pageStructure: CmsStructureModel
  ): Observable<CmsStructureModel> {
    return this.cmsStructureConfigService.mergePageStructure(
      pageContext.id,
      pageStructure
    );
  }
}
