import { signalStore, withState, withHooks, patchState } from '@ngrx/signals';
import { effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { IExperience } from '../interfaces/experience';
import { environment } from '../../environment/environment';
import { sortByTenure } from '../helpers/sort-by-date.helper';

type ExperienceState = {
  experiences: IExperience[];
  isLoading: boolean;
};

const initialState: ExperienceState = {
  experiences: [],
  isLoading: true,
};

export const ExperienceStore = signalStore(
  withState(initialState),
  withHooks((store) => {
    const experienceResource = httpResource<Record<string, IExperience>>(
      () => `${environment.apiUrl}/experiences.json`
    );

    return {
      onInit() {
        effect(() => {
          const isLoading = experienceResource.isLoading();
          const data = experienceResource.value();

          if (data) {
            const experiences = sortByTenure(Object.values(data) as IExperience[]);
            patchState(store, { experiences, isLoading: false });
          } else {
            patchState(store, { isLoading });
          }
        });
      },
    };
  })
);