/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { StatePersistenceService } from '@spartacus/core';
import { of, Subscription } from 'rxjs';
import { DpPaymentRequest } from './../models/dp-checkout.model';

const KEY = 'digital-payment.checkout.request';

@Injectable({
  providedIn: 'root',
})
export class DpLocalStorageService implements OnDestroy {
  constructor(protected statePersistenceService: StatePersistenceService) {}
  protected subscription = new Subscription();

  syncCardRegistrationState(request: DpPaymentRequest): void {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage<
        DpPaymentRequest | undefined
      >({
        key: KEY,
        state$: of(request),
      })
    );
  }

  readCardRegistrationState(): DpPaymentRequest {
    const paymentRequest = this.statePersistenceService.readStateFromStorage({
      key: KEY,
    }) as DpPaymentRequest;

    this.clearDpStorage();
    return paymentRequest;
  }

  protected clearDpStorage() {
    this.statePersistenceService.syncWithStorage({
      key: KEY,
      state$: of({}),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
