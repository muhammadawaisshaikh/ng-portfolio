# Migrating My Angular Portfolio from v19 to v22: A Complete Step-by-Step Guide

Angular v22 landed with some exciting changes — zoneless change detection by default, TypeScript 6 support, the new `@angular/build` package, and signals taking center stage. I recently migrated my portfolio application from Angular 19 to 22, and here's exactly how I did it.

---

## What's New in Angular 22?

Before diving into the migration, here's what Angular 22 brings to the table:

- **Zoneless change detection** is now the default — no more `zone.js`
- **OnPush** is the default change detection strategy
- **TypeScript 6** support with deprecated options removed
- **`@angular/build`** replaces the deprecated `@angular-devkit/build-angular`
- **Signal Forms**, **Angular Aria**, and **`resource`/`httpResource`** are now stable
- **`@angular/animations`** and **`@angular/platform-browser-dynamic`** are deprecated
- New `@Service()` decorator, `injectAsync`, and template improvements

---

## Step 1: Update Dependencies in `package.json`

The first step is updating all Angular packages to v22. Here's what changed:

**Before (Angular 19):**
```json
{
  "dependencies": {
    "@angular/animations": "^19.1.6",
    "@angular/common": "^19.1.6",
    "@angular/compiler": "^19.1.6",
    "@angular/core": "^19.1.6",
    "@angular/forms": "^19.1.6",
    "@angular/platform-browser": "^19.1.6",
    "@angular/platform-browser-dynamic": "^19.1.6",
    "@angular/router": "^19.1.6",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.1.7",
    "@angular/cli": "^19.1.7",
    "@angular/compiler-cli": "^19.1.6",
    "typescript": "~5.5.2"
  }
}
```

**After (Angular 22):**
```json
{
  "engines": {
    "node": ">=24.15.0"
  },
  "dependencies": {
    "@angular/common": "^22.0.5",
    "@angular/compiler": "^22.0.5",
    "@angular/core": "^22.0.5",
    "@angular/forms": "^22.0.5",
    "@angular/platform-browser": "^22.0.5",
    "@angular/router": "^22.0.5"
  },
  "devDependencies": {
    "@angular/build": "^22.0.5",
    "@angular/cli": "^22.0.5",
    "@angular/compiler-cli": "^22.0.5",
    "typescript": "~6.0.3"
  }
}
```

**Key changes:**
- Removed `zone.js` (Angular 22 is zoneless by default)
- Removed `@angular/animations` (deprecated — use `animate.enter`/`animate.leave`)
- Removed `@angular/platform-browser-dynamic` (deprecated — use `@angular/platform-browser`)
- Replaced `@angular-devkit/build-angular` with `@angular/build`
- TypeScript upgraded from 5.5 to 6.0

---

## Step 2: Update `angular.json` — New Builders

Angular 22 deprecates the old webpack-based `@angular-devkit/build-angular` builders. Replace them with `@angular/build`:

```json
{
  "architect": {
    "build": {
      "builder": "@angular/build:application"
    },
    "serve": {
      "builder": "@angular/build:dev-server"
    },
    "extract-i18n": {
      "builder": "@angular/build:extract-i18n"
    },
    "test": {
      "builder": "@angular/build:karma"
    }
  }
}
```

Also remove `zone.js` from polyfills:

```json
"polyfills": []
```

And remove the obsolete `mixed-decls` from sass `silenceDeprecations` if you had it:

```json
"stylePreprocessorOptions": {
  "sass": {
    "silenceDeprecations": ["color-functions", "global-builtin", "import"]
  }
}
```

---

## Step 3: Update `tsconfig.json` for TypeScript 6

TypeScript 6 removes several deprecated options. Update your `tsconfig.json`:

**Remove these:**
- `"experimentalDecorators": true` — decorators are now a standard TC39 feature
- `"esModuleInterop": true` — always enabled in TS 6

**Keep these (still valid):**
```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "module": "ES2022",
    "isolatedModules": true,
    "skipLibCheck": true
  }
}
```

---

## Step 4: Switch to Zoneless Change Detection

This is the biggest architectural change. In `app.config.ts`, replace `provideZoneChangeDetection` with `provideZonelessChangeDetection`:

**Before:**
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

**After:**
```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

---

## Step 5: Convert Reactive State to Signals

This is where the real work begins. Without `zone.js`, Angular can't automatically detect property changes from async operations (`setTimeout`, `setInterval`, HTTP subscriptions). You need to use **signals** for any state that changes asynchronously and is bound in templates.

### Converting a Service from BehaviorSubjects to Signals

**Before:**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  public isHide: any = new BehaviorSubject(false);
  public isPageAnimate: any = new BehaviorSubject(false);

  setIsHide(val: boolean) {
    return this.isHide.next(val);
  }

  setIsPageAnimate(val: boolean) {
    return this.isPageAnimate.next(val);
  }
}
```

**After:**
```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  readonly isHide = signal(false);
  readonly isPageAnimate = signal(false);

  setIsHide(val: boolean) {
    this.isHide.set(val);
  }

  setIsPageAnimate(val: boolean) {
    this.isPageAnimate.set(val);
  }
}
```

### Consuming Signals in Components

**Before (subscribing to BehaviorSubject):**
```typescript
export class AppComponent implements OnInit {
  isHide: boolean = false;
  isPageAnimate: boolean = false;

  constructor(private globalState: GlobalStateService) {}

  ngOnInit(): void {
    this.globalState.isHide.subscribe((val: boolean) => {
      this.isHide = val;
    });
  }
}
```

**After (exposing signals directly):**
```typescript
export class AppComponent {
  private globalState = inject(GlobalStateService);

  readonly isHide = this.globalState.isHide;
  readonly isPageAnimate = this.globalState.isPageAnimate;
}
```

### Updating Templates to Call Signals

Signals are getter functions — you read them by calling them with `()`:

**Before:**
```html
@if (!isHide) {
  <app-loading-splash />
}
```

**After:**
```html
@if (!isHide()) {
  <app-loading-splash />
}
```

### Converting `setInterval`/Async Mutations to Signals

Any property that changes via `setInterval`, `setTimeout`, or HTTP callbacks must be a signal:

**Before:**
```typescript
currentHashtag: string = this.hashtags[0];

startAnimation(): void {
  this.intervalId = setInterval(() => {
    this.hashtagIndex = (this.hashtagIndex + 1) % this.hashtags.length;
    this.currentHashtag = this.hashtags[this.hashtagIndex];
  }, 1000);
}
```

**After:**
```typescript
currentHashtag = signal(this.hashtags[0]);

startAnimation(): void {
  this.intervalId = setInterval(() => {
    this.hashtagIndex = (this.hashtagIndex + 1) % this.hashtags.length;
    this.currentHashtag.set(this.hashtags[this.hashtagIndex]);
  }, 1000);
}
```

Template: `#{{currentHashtag}}` → `#{{currentHashtag()}}`

### Converting UI Toggle State to Signals

Component properties toggled from event handlers that also get updated from `setTimeout` or other async contexts:

**Before:**
```typescript
toggleButton: boolean = false;
sidebar: boolean = false;

toggleMenu() {
  this.toggleButton = !this.toggleButton;
  this.sidebar = !this.sidebar;
}
```

**After:**
```typescript
toggleButton = signal(false);
sidebar = signal(false);

toggleMenu() {
  this.toggleButton.update(v => !v);
  this.sidebar.update(v => !v);
}
```

Template: `[ngClass]="{'show': sidebar}"` → `[ngClass]="{'show': sidebar()}"`

### Converting HTTP Data Arrays to Signals

**Before:**
```typescript
techSpeaking: ITechSpeaking[] = [];

getTechSpeakingsData() {
  this.apiService.getTechSpeakingInfo().subscribe({
    next: (res: any) => {
      this.techSpeaking = sortByYearAndMonth(techSpeakingData);
    }
  });
}
```

**After:**
```typescript
techSpeaking = signal<ITechSpeaking[]>([]);

getTechSpeakingsData() {
  this.apiService.getTechSpeakingInfo().subscribe({
    next: (res: any) => {
      this.techSpeaking.set(sortByYearAndMonth(techSpeakingData));
    }
  });
}
```

Template: `@for (item of techSpeaking; ...)` → `@for (item of techSpeaking(); ...)`

---

## Step 6: Migrate API Calls to `httpResource`

Angular 22 promotes `httpResource` as the declarative, signal-based way to fetch HTTP data. It's now stable and replaces the manual `HttpClient` + `subscribe()` pattern. I integrated it **alongside ngrx signal stores** — the stores remain for state management, but `httpResource` replaces the fetching mechanism.

### Architecture Change

```
BEFORE:
Component → ngOnInit() → Store.loadData() → ApiService → HttpClient.get().pipe(...)
                                              (Observable + lastValueFrom)

AFTER:
Component → Store (auto-fetches via withHooks) → httpResource() → API
                                                  (declarative, signal-based)
```

### Using `httpResource` Inside ngrx Signal Stores

The key pattern: use `httpResource` inside `withHooks` and sync its reactive state into the store via `effect()`:

**Before (HttpClient + lastValueFrom):**
```typescript
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { lastValueFrom, map } from 'rxjs';

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

      patchState(store, { experiences: sortByTenure(experiences), isLoading: false });
    },
  }))
);
```

**After (httpResource + withHooks):**
```typescript
import { signalStore, withState, withHooks, patchState } from '@ngrx/signals';
import { effect } from '@angular/core';
import { httpResource } from '@angular/common/http';

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
```

### Components No Longer Need `ngOnInit` Load Calls

Since `httpResource` auto-fetches when the store initializes via `withHooks`, components become simpler:

**Before:**
```typescript
export class ExperienceComponent {
  readonly store = inject(ExperienceStore);

  ngOnInit(): void {
    this.store.loadExperienceData();
  }
}
```

**After:**
```typescript
export class ExperienceComponent {
  readonly store = inject(ExperienceStore);
  // Data loads automatically when the store is created!
}
```

### Using `httpResource` Directly in Components (Without Stores)

For components that don't need a store, `httpResource` works great with `computed()`:

```typescript
import { httpResource } from '@angular/common/http';
import { computed, signal } from '@angular/core';

export class TechnologyTalksComponent {
  private selectedId = signal<string | null>(null);

  // Static resource - auto-fetches on init
  private techSpeakingResource = httpResource<Record<string, ITechSpeaking>>(
    () => `${environment.apiUrl}/tech-speaking.json`
  );

  // Reactive resource - re-fetches when selectedId changes
  private detailResource = httpResource<ITechSpeaking>(() => {
    const id = this.selectedId();
    if (!id) return undefined; // Don't fetch if no id
    return `${environment.apiUrl}/tech-speaking/${id}.json`;
  });

  // Derived computed signal for template binding
  readonly techSpeaking = computed(() => {
    const data = this.techSpeakingResource.value();
    if (!data) return [];
    return sortByYearAndMonth(Object.entries(data).map(([key, value]) => ({
      id: key, ...value
    })));
  });
}
```

### Deleted the `ApiService`

With `httpResource` handling all HTTP calls declaratively, the `ApiService` wrapper became dead code. Removed it entirely — one less abstraction layer!

---

## Step 7: Update Node.js

Angular 22 requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`. I upgraded via Homebrew:

```bash
brew upgrade node
# v24.10.0 → v26.4.0
```

---

## Step 8: Deployment Configuration (Vercel)

If you're deploying on Vercel, you'll need:

**`.nvmrc`** — Tell Vercel which Node version to use:
```
24
```

**`.npmrc`** — Handle peer dependency conflicts (e.g., ngrx not yet released for Angular 22):
```
legacy-peer-deps=true
```

Also update **Vercel Project Settings** → Node.js Version → `24.x`.

---

## The Rule of Thumb for Zoneless

Here's the simple mental model I used:

> **If a property is bound in a template AND changes outside of a user event handler (click, input, etc.), it must be a signal.**

Things that need signals:
- ✅ Data from HTTP calls (`.subscribe()` callbacks)
- ✅ `setInterval` / `setTimeout` mutations
- ✅ WebSocket messages
- ✅ Service state shared across components

Things that DON'T need signals:
- ❌ Static data (arrays, configs that never change)
- ❌ Properties only changed inside `(click)` handlers (Angular intercepts DOM events)
- ❌ ngrx signal stores (already use signals internally)
- ❌ Signal inputs (`input()`) — already reactive

---

## Final Build

```bash
$ ng build

✔ Building...
Initial chunk files | Names    | Raw size | Transfer size
main-HOESYXZG.js   | main     | 338.19 kB |      96.65 kB
styles-E2VDXCGW.css | styles  | 237.17 kB |      23.68 kB

Application bundle generation complete. [2.778 seconds]
```

Zero errors. The app is now fully running on Angular 22 with zoneless architecture and `httpResource`.

---

## Summary of All Changes

| File | Change |
|---|---|
| `package.json` | Angular 22, TS 6, removed zone.js/animations/platform-browser-dynamic |
| `angular.json` | `@angular/build` builders, empty polyfills |
| `tsconfig.json` | Removed `experimentalDecorators`, `esModuleInterop` |
| `app.config.ts` | `provideZonelessChangeDetection()` |
| Services | BehaviorSubjects → signals; `ApiService` deleted |
| Stores | `HttpClient` + `lastValueFrom` → `httpResource` + `withHooks` + `effect` |
| Components | Plain properties → signals; removed `ngOnInit` load calls |
| Templates | Property references → signal calls `()` |
| `.nvmrc` | Node 24 for deployment |
| `.npmrc` | `legacy-peer-deps=true` for ngrx compat |

---

## Final Thoughts

The migration from Angular 19 to 22 is more than a version bump — it's an architectural shift toward a truly reactive, zone-free paradigm. Signals replace the implicit change detection that `zone.js` provided, making your app's reactivity **explicit and predictable**.

The biggest wins:
- **`httpResource`** eliminated the `ApiService` boilerplate entirely — no more manual subscriptions, no more `lastValueFrom`, no more imperative `loadData()` calls
- **Zoneless + signals** make change detection explicit and performant
- **ngrx signal stores + `httpResource`** work beautifully together — stores manage state, resources handle fetching declaratively

The payoff is better performance, smaller bundles (no zone.js overhead), and code that clearly communicates where state changes happen.

Happy migrating! 🚀

---

*Muhammad Awais is a Lead Software Engineer, tech speaker, and open source contributor. Connect on [Medium](https://medium.com/@awaisshaikh94) or [GitHub](https://github.com/muhammadawaisshaikh).*
