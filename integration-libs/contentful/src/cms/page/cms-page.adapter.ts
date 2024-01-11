import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CMS_PAGE_NORMALIZER,
  CmsPageAdapter,
  CmsStructureModel,
  ConverterService,
  HOME_PAGE_CONTEXT,
  OccCmsPageRequest,
  OccEndpointsService,
  PageContext,
  PageType,
  SMART_EDIT_CONTEXT,
} from '@spartacus/core';
import { ContentfulGraphqlService } from './contentful-graphql.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfulCmsPageAdapter implements CmsPageAdapter {
  // protected readonly userIdService = inject(UserIdService);
  // protected readonly featureConfigService = inject(FeatureConfigService);
  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected contentfulService: ContentfulGraphqlService
  ) {}

  /**
   * @override returns the Contentful CMS page data for the given context and converts
   * the data by any configured `CMS_PAGE_NORMALIZER`.
   */
  load(pageContext: PageContext): Observable<CmsStructureModel> {
    if (this.contentfulService.isManagedPage(pageContext)) {
      return this.contentfulService.graphql(pageContext);
      // ???
      //   .pipe(
      //   tap((cmsPageResponse) => {
      //     console.log(
      //       'ContentfulOccCmsPageNormalizer.output',
      //       JSON.stringify(cmsPageResponse, null, 2)
      //     );
      //   })
      // );
    }

    const params = this.getPagesRequestParams(pageContext);
    // TODO: (CXSPA-4886) Remove flag in the major
    // if (this.featureConfigService.isEnabled(USER_CMS_ENDPOINTS)) {
    //   return this.userIdService.getUserId().pipe(
    //     switchMap((userId: string) => {
    //       const endpoint = !pageContext.type
    //         ? this.occEndpoints.buildUrl('page', {
    //             urlParams: { id: pageContext.id, userId },
    //           })
    //         : this.occEndpoints.buildUrl('pages', {
    //             urlParams: { userId },
    //             queryParams: params,
    //           });
    //
    //       return this.http.get(endpoint, { headers: this.headers });
    //     }),
    //     this.converter.pipeable(CMS_PAGE_NORMALIZER)
    //   );
    // }
    const endpoint = !pageContext.type
      ? this.occEndpoints.buildUrl('page', {
          urlParams: { id: pageContext.id },
        })
      : this.occEndpoints.buildUrl('pages', {
          queryParams: params,
        });
    return this.http
      .get(endpoint, { headers: this.headers })
      .pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
  }

  /**
   * The OCC CMS API allows to query pages by a combination of pageType, label and code.
   *
   * When a `ContentPage` is requested, we use the `pageLabelOrId`:
   *
   * ```
   * "/pages?pageLabelOrId=/my-page&pageType=ContentPage"
   * ```
   *
   * Other pages are queried by code:
   *
   * ```
   * "/pages?code=1234&pageType=ProductPage"
   * ```
   *
   * The page context is ignored for a home page request or in case of a
   * `smartedit-preview` request.
   */
  protected getPagesRequestParams(context: PageContext): OccCmsPageRequest {
    if (context.id === HOME_PAGE_CONTEXT || context.id === SMART_EDIT_CONTEXT) {
      return {};
    }

    const httpParams: OccCmsPageRequest = {};
    if (context.type) {
      httpParams.pageType = context.type;
    }
    if (context.type === PageType.CONTENT_PAGE) {
      httpParams.pageLabelOrId = context.id;
    } else {
      httpParams.code = context.id;
    }

    return httpParams;
  }
}
