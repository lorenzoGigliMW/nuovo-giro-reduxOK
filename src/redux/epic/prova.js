import { mergeMap } from 'rxjs/operators';
import { from, of, catchError, map } from 'rxjs';
import axios from 'axios';
import { combineEpics } from 'redux-observable';
import {
    TASK_VISUALTODO, //taskAdd, CONFIGURATION_SERVER_FETCH_FULFILLED, CONFIGURATION_SERVER_FETCH_CANCEL, CONFIGURATION_SERVER_FETCH, CONFIGURATION_SERVER_FETCH_REJECTED,
    configurationServerFetchRejected, configurationServerFetchFulfilled, TASK_ADD, TASK_EDIT, TASK_TOGGLED, TASK_SEEALL, TASK_CANCEL,configurationServerFetch
} from '../actions/prova';
import { ofType } from 'redux-observable';

const provaEpic = action$ => action$.pipe(
    ofType(TASK_VISUALTODO),
    mergeMap(action => from(axios.get('http://localhost:3005/api/todos')).pipe(
        map(response => {
            return configurationServerFetchFulfilled(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),

    ofType(TASK_ADD),
    mergeMap(action => from(axios.post('http://localhost:3005/api/todo/add')).pipe(
        map(response => {
            return configurationServerFetch(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),

        ofType(TASK_EDIT),
    mergeMap(action => from(axios.post('http://localhost:3005/api/todo/edit/:id')).pipe(
        map(response => {
            return configurationServerFetch(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),
       
        ofType(TASK_TOGGLED),
    mergeMap(action => from(axios.post('http://localhost:3005/api/todo/toggle/:id')).pipe(
        map(response => {
            return configurationServerFetch(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),
       
        ofType(TASK_SEEALL),
    mergeMap(action => from(axios.post('http://localhost:3005/api/todos')).pipe(
        map(response => {
            return configurationServerFetch(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),
        
        ofType(TASK_CANCEL),
    mergeMap(action => from(axios.delete('http://localhost:3005/api/todo/del/:id')).pipe(
        map(response => {
            return configurationServerFetch(response.data)
        }),
        catchError(err => of(configurationServerFetchRejected(err.message))))),
);




const Epics = combineEpics(provaEpic);
export default Epics;
