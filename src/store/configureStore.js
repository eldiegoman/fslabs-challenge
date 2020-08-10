import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";

import createHistory from "history/createBrowserHistory";
import { rootEpic } from "../state/rootEpics";
import rootReducer from "../state/rootReducer";
export const history = createHistory();

const epicMiddleware = createEpicMiddleware({
  dependencies: { getJSON: ajax.getJSON },
});

function configureStoreProd(initialState) {
  const middlewares = [
    // Add other middleware on this line...
    epicMiddleware,
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    epicMiddleware,
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../state/rootReducer.js", () => {
      const nextReducer = require("../state/rootReducer").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }
  epicMiddleware.run(rootEpic);
  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
