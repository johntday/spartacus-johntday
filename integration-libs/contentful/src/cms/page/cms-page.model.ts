export namespace Contentful {
  export interface Sys {
    id: string;
  }

  export interface Image {
    sys?: Sys;
    title?: string;
    url?: string;
    contentType?: string;
    width?: number;
    height?: number;
  }

  export interface CmsMedia {
    sys?: Sys;
    name?: string;
    altText?: string;
    mobile?: Image;
    tablet?: Image;
    desktop: Image;
    widescreen?: Image;
  }

  export interface CmsComponent {
    sys?: Sys;
    uid?: string;
    name?: string;
    typeCode?: string;
    container?: string;
    synchronizationBlocked?: string;
    cmsParagraphComponent?: CmsParagraphComponent;
    cmsBannerComponent?: CmsBannerComponent;
    categoryNavigationComponent?: CmsNavigationComponent;
    footerNavigationComponent?: CmsNavigationComponent;
    languageComponent?: CmsSiteContextComponent;
    currencyComponent?: CmsSiteContextComponent;
    cmsMiniCartComponent?: CmsMiniCartComponent;
    cmsLinkComponent?: CmsLinkComponent;
    cmsSearchBoxComponent?: CmsSearchBoxComponent;
    cmsProductCarouselComponent?: CmsProductCarouselComponent;
  }

  export interface CmsSiteContextComponent {
    context: string;
  }

  export interface CmsLinkComponent {
    contentPageLabelOrId?: string;
    linkName: string;
    external?: boolean;
    url?: string;
    target?: boolean;
  }

  export interface CmsSearchBoxComponent {
    maxSuggestions?: number;
    maxProducts?: number;
    displaySuggestions?: boolean;
    displayProducts?: boolean;
    displayProductImages?: boolean;
    waitTimeBeforeRequest?: number;
    minCharactersBeforeRequest?: number;
  }

  export interface CmsNavigationComponent {
    styleClass?: string;
    wrapAfter?: string;
    notice?: string;
    showLanguageCurrency?: string;
    navigationNode?: any;
    resetMenuOnClose?: boolean;
  }

  export interface CmsMiniCartComponent {
    shownProductCount?: number;
    totalDisplay?: string;
    title?: string;
    lightboxBannerComponent?: CmsBannerComponent;
  }

  export interface CmsBannerComponent {
    sys?: Sys;
    headline?: string;
    content?: string;
    media?: CmsMedia;
    urlLink?: string;
    external?: string;
    contentPage?: string;
    product?: string;
    category?: string;
  }

  export interface CmsProductCarouselComponent {
    sys?: Sys;
    title?: string;
    popup?: boolean;
    scroll?: string;
    productCodes?: string[];
  }

  export interface CmsParagraphComponent {
    sys?: Sys;
    title?: string;
    content?: string;
  }

  export interface CmsComponentCollection {
    items?: CmsComponent[];
  }

  export interface CmsComponentResponse {
    data?: {
      cmsComponentCollection?: CmsComponentCollection;
    };
  }

  export interface CmsSlot {
    sys?: Sys;
    uid?: string;
    name?: string;
    componentCollection?: CmsComponentCollection;
    properties?: any;
  }

  export interface CmsSlotCollection {
    items?: CmsSlot[];
  }

  export interface CmsSlotCollection {
    items?: CmsSlot[];
  }

  export interface CmsSlotCollection {
    items?: CmsSlot[];
  }

  export interface CmsSection {
    sys?: Sys;
    uid?: string;
    attributes?: any;
    slotsCollection?: CmsSlotCollection;
  }

  export interface CmsTemplate {
    sys?: Sys;
    uid?: string;
    name?: string;
    header?: CmsSection;
    footer?: CmsSection;
    navigation?: CmsSection;
    slotsCollection?: CmsSlotCollection;
  }

  export interface CmsPage {
    sys?: Sys;
    uid?: string;
    label?: string;
    title?: string;
    typeCode?: string;
    name?: string;
    template?: CmsTemplate;
    defaultPage?: boolean;
    description?: string;
    properties?: any;
    robot?: string;
  }

  export interface CmsPageCollection {
    items?: CmsPage[];
  }

  export interface CmsPageResponse {
    data?: {
      cmsPageCollection?: CmsPageCollection;
    };
  }
}
