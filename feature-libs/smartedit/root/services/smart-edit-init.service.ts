import { Injectable } from '@angular/core';
import { SmartEditService } from '../../core/services/smart-edit.service';
import { SmartEditLauncherService } from './smart-edit-launcher.service';

@Injectable({ providedIn: 'root' })
export class SmartEditInitService {
  static factory(smartEditInitService: SmartEditInitService): () => void {
    return (): void => {
      smartEditInitService.init();
    };
  }

  constructor(
    protected smartEditService: SmartEditService,
    protected smartEditLauncherService: SmartEditLauncherService
  ) {}

  init(): void {
    if (this.smartEditLauncherService.isLaunchedInSmartEdit()) {
      this.smartEditService.processCmsPage();
    }
  }
}
