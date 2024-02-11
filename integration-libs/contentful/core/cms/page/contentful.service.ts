import { Injectable } from '@angular/core';
import { CmsStructureModel, ConverterService, PageContext } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contentful } from './cms-page.model';
import { CONTENTFUL_CMS_PAGE_NORMALIZER } from './cms-page.converters';
import { ContentfulConfig } from '../../config/contentful-config';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor(
    protected http: HttpClient,
    protected converter: ConverterService,
    protected contentfulConfig: ContentfulConfig
  ) {}

  getManagedPages(): string[] {
    if (!this.contentfulConfig?.contentful?.managedPages) {
      return [];
    }
    return this.contentfulConfig.contentful.managedPages;
  }

  isManagedPage(pageContext: PageContext): boolean {
    return this.getManagedPages().includes(pageContext.id);
  }

  load(pageContext: PageContext): Observable<CmsStructureModel> {
    console.log('load', pageContext);
    return of({});
  }

  graphql(pageContext: PageContext): Observable<CmsStructureModel> {
    return this.http
      .get<Contentful.CmsPageResponse>(this.getPageEndpoint(pageContext), { headers: this.generateHeaders() })
      .pipe(this.converter.pipeable(CONTENTFUL_CMS_PAGE_NORMALIZER));
    // .pipe((cmsPageResponse) => {
    //   console.log('ContentfulService.graphql', pageContext.id, JSON.stringify(cmsPageResponse, null, 2));
    //   return cmsPageResponse;
    // });
  }

  protected generateHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        this.contentfulConfig?.contentful?.preview
          ? this.contentfulConfig?.contentful?.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : this.contentfulConfig?.contentful?.CONTENTFUL_ACCESS_TOKEN
      }`,
    });
  }

  protected getPageEndpoint(pageContext: PageContext): string {
    const space = this.contentfulConfig?.contentful?.CONTENTFUL_SPACE_ID;
    const env = this.contentfulConfig?.contentful?.CONTENTFUL_ENVIRONMENT;
    const baseUrl = this.contentfulConfig?.contentful?.baseUrl;
    const preview = this.contentfulConfig?.contentful?.preview;
    const pageId = pageContext.id; //.replace(/\//g, '');

    const query =
      'fragment componentFields on CmsComponent{uid,typeCode,cmsParagraphComponent{sys{id},title,content}cmsBannerComponent{sys{id},headline,content,urlLink,external,contentPage,product,category,media{name,altText,desktop{title,contentType,url,width,height}}}categoryNavigationComponent{description,wrapAfter,notice,showLanguageCurrency,resetMenuOnClose,navigationNode}footerNavigationComponent{description,wrapAfter,notice,showLanguageCurrency,resetMenuOnClose,navigationNode}languageComponent{context}currencyComponent{context}cmsMiniCartComponent{shownProductCount,totalDisplay,title,lightboxBannerComponent}cmsLinkComponent{linkName,external,url,target,contentPageLabelOrId}cmsSearchBoxComponent{maxSuggestions,maxProducts,displaySuggestions,displayProducts,displayProductImages,waitTimeBeforeRequest,minCharactersBeforeRequest}cmsProductCarouselComponent{sys{id},title,popup,scroll,productCodes}}' +
      `{cmsPageCollection(preview:${preview},limit:1,where:{label:"${pageId}"}){items{label,uid,name,title,description,robot,template{uid,name,header{uid,attributes,slotsCollection(limit:20){items{uid,componentCollection(limit:10){items{...componentFields}}}}}footer{uid,attributes,slotsCollection(limit:20){items{uid,componentCollection(limit:10){items{...componentFields}}}}}navigation{uid,attributes,slotsCollection(limit:20){items{uid,componentCollection(limit:10){items{...componentFields}}}}}slotsCollection(limit:20){items{uid,componentCollection(limit:10){items{...componentFields}}}}}}}}`;

    return `${baseUrl}/spaces/${space}/environments/${env}?query=${query}`;
  }
}
