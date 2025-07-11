import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);
export const selectFiltersProfile = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);
export const selectProfilePageble = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);
