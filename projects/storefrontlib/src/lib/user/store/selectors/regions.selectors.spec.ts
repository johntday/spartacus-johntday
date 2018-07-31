import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from '../../../routing/store';

describe('Regions Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllRegions', () => {
    it('should return all regions', () => {
      const mockRegions = [
        {
          isocode: 'CA-ON',
          name: 'Ontario'
        },
        {
          isocode: 'CA-QC',
          name: 'Quebec'
        }
      ];

      let result;
      store
        .select(fromSelectors.getAllRegions)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadRegionsSuccess(mockRegions));

      expect(result).toEqual(mockRegions);
    });
  });
});
