// about.store.ts
import { signalStore, withState, withHooks, patchState } from '@ngrx/signals';
import { effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { IAbout } from '../interfaces/about';
import { environment } from '../../environment/environment';

type AboutState = {
  about: IAbout;
  isLoading: boolean;
};

const initialState: AboutState = {
  about: {},
  isLoading: true,
};

export const AboutStore = signalStore(
  withState(initialState),
  withHooks((store) => {
    const aboutResource = httpResource<Record<string, IAbout>>(
      () => `${environment.apiUrl}/about.json`
    );

    return {
      onInit() {
        effect(() => {
          const isLoading = aboutResource.isLoading();
          const data = aboutResource.value();

          if (data) {
            const about = Object.values(data)[0] as IAbout;
            patchState(store, { about, isLoading: false });
          } else {
            patchState(store, { isLoading });
          }
        });
      },
    };
  })
);