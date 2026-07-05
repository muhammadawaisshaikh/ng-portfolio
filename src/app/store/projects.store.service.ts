import { signalStore, withState, withHooks, patchState } from '@ngrx/signals';
import { effect } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { IProject } from '../interfaces/project';
import { environment } from '../../environment/environment';

type ProjectState = {
  projects: IProject[];
  isLoading: boolean;
};

const initialState: ProjectState = {
  projects: [],
  isLoading: true,
};

export const ProjectsStore = signalStore(
  withState(initialState),
  withHooks((store) => {
    const projectsResource = httpResource<Record<string, IProject>>(
      () => `${environment.apiUrl}/projects.json`
    );

    return {
      onInit() {
        effect(() => {
          const isLoading = projectsResource.isLoading();
          const data = projectsResource.value();

          if (data) {
            const projects = Object.values(data) as IProject[];
            patchState(store, { projects, isLoading: false });
          } else {
            patchState(store, { isLoading });
          }
        });
      },
    };
  })
);
