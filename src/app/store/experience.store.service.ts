import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { IExperience } from '../interfaces/experience';
import { lastValueFrom, map } from 'rxjs';
import { sortByTenure } from '../helpers/sort-by-date.helper';

type ExperienceState = {
  experiences: IExperience[];
  isLoading: boolean;
};

const initialState: ExperienceState = {
  experiences: [],
  isLoading: false,
};

export const ExperienceStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    async loadExperienceData(): Promise<void> {
      patchState(store, { isLoading: true });

      const experiences = await lastValueFrom(
        apiService.getExperiencesInfo().pipe(
          map(res => Object.values(res) as IExperience[])
        )
      );

      const sortedExperiences = sortByTenure(experiences);

      patchState(store, { experiences: sortedExperiences, isLoading: false });
    },
  }))
);