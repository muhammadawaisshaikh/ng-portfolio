import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { IProject } from '../interfaces/project';
import { lastValueFrom, map } from 'rxjs';

type ProjectState = {
  projects: IProject[];
  isLoading: boolean;
};

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
};

export const ProjectsStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    async loadProjectsData(): Promise<void> {
      patchState(store, { isLoading: true });

      const projects = await lastValueFrom(
        apiService.getProjectsInfo().pipe(
          map(res => Object.values(res) as IProject[])
        )
      );

      patchState(store, { projects, isLoading: false });
    },
  }))
);
