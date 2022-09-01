/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PickupOption } from '@spartacus/pickup-in-store/root';

export const PICKUP_OPTION_FEATURE = 'pickup-option';

export interface StateWithPickupOption {
  [PICKUP_OPTION_FEATURE]: PickupOptionState;
}

export type EntryPickupOption = {
  entryNumber: number;
  pickupOption: PickupOption;
};

export interface PickupOptionState {
  pickupOption: EntryPickupOption[];
  pageContext: string;
}
