import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from 'src/core/store/planets/planets.reducer';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import swapiSliceReducer from 'src/core/store/swapi/swapi.reducer';
import { starwarsContentApi } from 'src/core/store/swapi/swapi';

export const appStore = configureStore({
  reducer: {
    planets: planetsReducer,
    [starwarsContentApi.reducerPath]: starwarsContentApi.reducer,
    swapiConfig: swapiSliceReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(starwarsContentApi.middleware);
  },
  
  devTools: {
    trace: true,
    name: 'Starwars DB - SWDB',
    actionsDenylist: ['__rtkq/focused', '__rtkq/unfocused']
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(appStore.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;
