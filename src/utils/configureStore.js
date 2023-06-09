import { configureStore } from '@reduxjs/toolkit'
import { combineReducers} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import prova from '../redux/reducers/prova';
import provaEpic from '../redux/epic/prova';
  const rootReducer = combineReducers({prova})/*selectors, filter: reducerFilter*/

  const epicMiddleware = createEpicMiddleware();
                          //   MIDDELWARE
const logger = store => (next) => {
    if (!console.group) {
      return next;
    }
    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      const returnValue = next(action);
      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };

  // const asyncMiddleware = store => next => action => {
  //   if (typeof action === 'TASKS_FETCH_ADD'|| typeof action === 'TASKS_FETCH_CANCEL') {
  //     return action(store.dispatch, store.getState);
  //   }
  
  //   return next(action);
  // };

const store = configureStore({
    reducer: rootReducer, middleware: [logger, epicMiddleware] //.concat(asyncMiddleware)
    
})
epicMiddleware.run(provaEpic);

export default store