import { Injectable } from '@angular/core';
import {
  CmsBannerComponent,
  CmsBannerComponentMedia,
  CmsComponent,
  CmsProductCarouselComponent,
  CmsResponsiveBannerComponentMedia,
  CmsStructureModel,
  ContentSlotComponentData,
  ContentSlotData,
  Converter,
  Occ,
  Page,
  PageRobotsMeta,
  PageType,
} from '@spartacus/core';
import { Contentful } from './cms-page.model';

@Injectable({ providedIn: 'root' })
export class ContentfulOccCmsPageNormalizer
  implements Converter<Contentful.CmsPageResponse, CmsStructureModel>
{
  uniqueSourceSlots: Contentful.CmsSlot[] = [];

  convert(
    source: Contentful.CmsPageResponse,
    target: CmsStructureModel = {}
  ): CmsStructureModel {
    // console.log('ContentfulOccCmsPageNormalizer.input', JSON.stringify(source, null, 2));
    this.normalizePageData(source, target);
    this.normalizePageSlotData(source, target);
    this.normalizePageComponentData(source, target);
    this.normalizeComponentData(source, target);
    return target;
  }

  /**
   * Converts the OCC cms page model to the `Page` in the `CmsStructureModel`.
   */
  protected normalizePageData(
    source: Contentful.CmsPageResponse,
    target: CmsStructureModel
  ): void {
    const sourcePage = source.data?.cmsPageCollection?.items?.[0];
    const sourceTemplate = sourcePage?.template;
    if (!source || !sourcePage) {
      return;
    }
    const page: Page = {
      name: sourcePage.name,
      pageId: sourcePage.uid,
      type: sourcePage.typeCode || PageType.CONTENT_PAGE,
      label: sourcePage.label,
      title: sourcePage.title,
      description: sourcePage.description,
      template: sourceTemplate?.uid,
      properties: sourcePage.properties,
    };

    this.normalizeRobots(sourcePage.robot, page);

    target.page = page;
  }

  /**
   * Adds a ContentSlotData for each page slot in the `CmsStructureModel`.
   */
  protected normalizePageSlotData(
    source: Contentful.CmsPageResponse,
    target: CmsStructureModel
  ): void {
    target.page = target.page ?? {};
    target.page.slots = {};

    const mainSlots =
      source.data?.cmsPageCollection?.items?.[0]?.template?.slotsCollection
        ?.items;
    const headerSlots =
      source.data?.cmsPageCollection?.items?.[0]?.template?.header
        ?.slotsCollection?.items;
    const footerSlots =
      source.data?.cmsPageCollection?.items?.[0]?.template?.footer
        ?.slotsCollection?.items;
    const navigationSlots =
      source.data?.cmsPageCollection?.items?.[0]?.template?.navigation
        ?.slotsCollection?.items;

    const sourceSlots = mainSlots
      ?.concat(headerSlots ?? [])
      .concat(footerSlots ?? [])
      .concat(navigationSlots ?? []);
    this.uniqueSourceSlots = arrayUnique(sourceSlots ?? []);

    if (this.uniqueSourceSlots) {
      for (const slot of this.uniqueSourceSlots ?? []) {
        target.page.slots[`${slot.uid}`] = {} as ContentSlotData;
        if (slot.properties) {
          target.page.slots[`${slot.uid}`].properties = slot.properties;
        }
      }
    }
  }

  /**
   * Registers the `ContentSlotComponentData` for each component.
   */
  protected normalizePageComponentData(
    _source: Contentful.CmsPageResponse,
    target: CmsStructureModel
  ): void {
    if (!this.uniqueSourceSlots) {
      return;
    }

    for (const slot of this.uniqueSourceSlots ?? []) {
      for (const component of slot.componentCollection?.items ?? []) {
        const comp: ContentSlotComponentData = {
          uid: component.uid,
          typeCode: component.typeCode,
          flexType: component.typeCode,
        };

        const targetSlot = target.page?.slots?.[`${slot.uid}`];
        if (targetSlot) {
          if (!targetSlot.components) {
            targetSlot.components = [];
          }
          targetSlot.components.push(comp);
        }
      } // for component
    } // for slot
  }

  /**
   * Adds the actual component data whenever available in the CMS page data.
   *
   * If the data is not populated in this payload, it is loaded separately
   * (`OccCmsComponentAdapter`).
   */
  protected normalizeComponentData(
    _source: Contentful.CmsPageResponse,
    target: CmsStructureModel
  ): void {
    if (!this.uniqueSourceSlots) {
      return;
    }

    for (const slot of this.uniqueSourceSlots) {
      for (const component of slot.componentCollection?.items ?? []) {
        // while we're hoping to get this right from the backend api,
        // the OCC api stills seems out of sync with the right model.
        // if (component.modifiedtime) {
        //   component.modifiedTime = component.modifiedtime;
        //   delete component.modifiedtime;
        // }

        // we don't put properties into component state
        // if (component.data) {
        //   component.data = undefined;
        // }
        if (!target.components) {
          target.components = [];
        }
        const targetComponent: CmsComponent =
          this.normalizeComponent(component);
        target.components.push(targetComponent);
      }
    }
  }

  /**
   * Normalizes the page robot string to an array of `PageRobotsMeta` items.
   */
  protected normalizeRobots(
    sourceRobot: string | undefined,
    target: Page
  ): void {
    const robots = [];
    if (sourceRobot) {
      switch (sourceRobot) {
        case Occ.PageRobots.INDEX_FOLLOW:
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case Occ.PageRobots.NOINDEX_FOLLOW:
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.FOLLOW);
          break;
        case Occ.PageRobots.INDEX_NOFOLLOW:
          robots.push(PageRobotsMeta.INDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
        case Occ.PageRobots.NOINDEX_NOFOLLOW:
          robots.push(PageRobotsMeta.NOINDEX);
          robots.push(PageRobotsMeta.NOFOLLOW);
          break;
      }
    }

    target.robots = robots;
  }

  protected normalizeComponent(source: Contentful.CmsComponent): CmsComponent {
    if (
      source.typeCode === undefined ||
      ![
        'CmsParagraphComponent',
        'BreadcrumbComponent',
        'SimpleBannerComponent',
        'ProductCarouselComponent',
        'CategoryNavigationComponent',
        'CMSSiteContextComponent',
        'MiniCartComponent',
        'FooterNavigationComponent',
        'CMSLinkComponent',
        'SearchBoxComponent',
        'CMSFlexComponent',
      ].includes(source.typeCode)
    ) {
      throw new Error(
        `Invalid typeCode '${source.typeCode}' for component.uid '${source.uid}'`
      );
    }

    const target = flattenObj(source) as CmsBannerComponent;
    target.otherProperties = { id: source.sys?.id };

    if (source.typeCode === 'SimpleBannerComponent') {
      const sourceBannerComponent = <Contentful.CmsBannerComponent>(
        source.cmsBannerComponent
      );
      const mobile = sourceBannerComponent?.media?.mobile;
      const tablet = sourceBannerComponent?.media?.tablet;
      const desktop = sourceBannerComponent?.media?.desktop;
      const widescreen = sourceBannerComponent?.media?.widescreen;
      const altText = sourceBannerComponent?.media?.altText;

      if (!mobile && !tablet && desktop && !widescreen) {
        target.media = this.normalizeMedia(desktop, altText);
      } else if (mobile && tablet && desktop && widescreen) {
        target.media = {
          mobile: this.normalizeMedia(mobile, altText),
          tablet: this.normalizeMedia(tablet, altText),
          desktop: this.normalizeMedia(desktop, altText),
          widescreen: this.normalizeMedia(widescreen, altText),
        } as CmsResponsiveBannerComponentMedia;
      } else {
        throw new Error(
          `Invalid media configuration for component.uid '${source.uid}'`
        );
      }
    } else if (source.typeCode === 'ProductCarouselComponent') {
      const sourceProductCarouselComponent = <
        Contentful.CmsProductCarouselComponent
      >source.cmsProductCarouselComponent;

      if (
        sourceProductCarouselComponent &&
        sourceProductCarouselComponent.productCodes &&
        Array.isArray(sourceProductCarouselComponent.productCodes) &&
        sourceProductCarouselComponent.productCodes.length > 0
      ) {
        const p: CmsProductCarouselComponent = target;
        p.productCodes = sourceProductCarouselComponent.productCodes.join(' ');
      }
    }

    // todo: ??? add other component types

    return target;
  }

  protected normalizeMedia(
    source: Contentful.Image | undefined,
    altText: string | undefined
  ): CmsBannerComponentMedia {
    return {
      url: source?.url,
      altText: source?.title || altText || '',
      mime: source?.contentType,
      code: source?.url,
    } as CmsBannerComponentMedia;
  }
}

const flattenObj = (ob: Record<string, any>): Record<string, any> => {
  let result: Record<string, any> = {};

  for (const key in ob) {
    if (ob.hasOwnProperty(key)) {
      // only flatten one level of objects
      if (typeof ob[key] === 'object' && ob[key] !== null) {
        const temp = flattenObj(ob[key]);
        for (const key2 in temp) {
          if (temp.hasOwnProperty(key2)) {
            result[key2] = temp[key2];
          }
        }
      } else if (ob[key] !== null) {
        result[key] = ob[key];
      }
    }
  }

  return result;
};

function arrayUnique(array: any[]): any[] {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i].uid === a[j].uid) a.splice(j--, 1);
    }
  }

  return a;
}
