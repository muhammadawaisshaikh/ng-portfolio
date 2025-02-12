// about.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { IAbout } from '../interfaces/about';
import { lastValueFrom, map } from 'rxjs';

type AboutState = {
  about: IAbout;
  isLoading: boolean;
};

const initialState: AboutState = {
  about: {},
  isLoading: false,
};

export const AboutStore = signalStore(
  // { providedIn: 'root' }, // if you want to access this store globally in your app
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    async loadAboutData(): Promise<void> {
      patchState(store, { isLoading: true });

      const about = await lastValueFrom(
        apiService.getAboutInfo().pipe(
          map(res => Object.entries(res)[0][1] as IAbout)
        )
      );

      patchState(store, { about, isLoading: false });
    },
  }))
);