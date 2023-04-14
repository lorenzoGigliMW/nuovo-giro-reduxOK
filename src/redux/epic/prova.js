import {mergeMap } from 'rxjs/operators';
import { from, of,catchError } from 'rxjs';
import axios from 'axios';
import { combineEpics } from 'redux-observable';
import { TASK_VISUALTODO, taskAdd,CONFIGURATION_SERVER_FETCH_FULFILLED,CONFIGURATION_SERVER_FETCH_CANCEL,CONFIGURATION_SERVER_FETCH,
    CONFIGURATION_SERVER_FETCH_REJECTED, configurationServerFetchRejected, configurationServerFetch, configurationServerFetchFulfilled} from '../actions/prova';
import { ofType } from 'redux-observable';


 
    // const observer = {
    //         next: () =>CONFIGURATION_SERVER_FETCH,
    //         error:  ()=> CONFIGURATION_SERVER_FETCH_REJECTED,
    //         complete: () => CONFIGURATION_SERVER_FETCH_FULFILLED
    //     };

const provaEpic = action$ => action$.pipe(
   
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(TASK_VISUALTODO),
    mergeMap(action => from(axios.get('http://localhost:3005/api/todos')).pipe(
        mergeMap(response => {
            //response.data.forEach(element => {
                  
            let newArr = [...response.data];
            let arrayBono = []

            newArr.map(elem => {
                let dataElem = taskAdd(elem)
                arrayBono.push(dataElem); 
            //     result=()=>of(...arrayBono)
            //    .subscribe(
            //         next => console.log('next:', next),
            //         err => console.log('error:', err),
            //         () => console.log('Completed'),
            //       );  
            })
            // .subcribe((value) => {
            //         console.log(value);
            //         });
            return of(...arrayBono)
            // .subscribe(
            //     next => console.log('next:', next),
            //     err => console.log('error:', err),
            //     () => console.log('Completed'),
            //   );
            //});
        },

        // catchError(err => console.log(err))
         //  catchError(err => of(qualcosa(err)))
        // startWith(loadingData())

        //,CONFIGURATION_SERVER_FETCH_CANCEL,CONFIGURATION_SERVER_FETCH,
        //CONFIGURATION_SERVER_FETCH_FULFILLED,CONFIGURATION_SERVER_FETCH_REJECTED//.subscribe(observer)
      ))
//   .subscribe(
//     response => console.log(response),
//     error => console.log(error)
//   )
  )
  );

  const fulfilledEpic = action$ => action$.pipe(
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(CONFIGURATION_SERVER_FETCH_FULFILLED),
    mergeMap(action => from(axios.get('http://localhost:3005/api/fulfilled')).pipe(
        mergeMap(response => {
            //response.data.forEach(element => {
                  
            let newArr = [...response.data];

            let arrayBono = []
            newArr.map(elem => {
                let dataElem = configurationServerFetchFulfilled(elem)
                arrayBono.push(dataElem);
            })
            return of(...arrayBono);
            //});
        }
    )
  )));

  const rejectedEpic = action$ => action$.pipe(
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(CONFIGURATION_SERVER_FETCH_REJECTED),
    mergeMap(action => from(axios.get('http://localhost:3005/api/rejected')).pipe(
        mergeMap(response => {
            //response.data.forEach(element => {
                  
            let newArr = [...response.data];

            let arrayBono = []
            newArr.map(elem => {
                let dataElem = configurationServerFetchRejected(elem)
                arrayBono.push(dataElem);
            })
            return of(...arrayBono);
            //});
        }
    )
  )));

  const completeEpic = action$ => action$.pipe(
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(CONFIGURATION_SERVER_FETCH),
    mergeMap(action => from(axios.get('http://localhost:3005/api/fetch')).pipe(
        mergeMap(response => {
            //response.data.forEach(element => {
                  
            let newArr = [...response.data];

            let arrayBono = []
            newArr.map(elem => {
                let dataElem = configurationServerFetch(elem)
                arrayBono.push(dataElem);
            })
            return of(...arrayBono);
            //});
        }
    )
  )));
//   .subcribe((value) => {
//     console.log(value);
//     });
        // catchError(err => of(loadDataFailed(err)),
        // startWith(loadingData())

        //,CONFIGURATION_SERVER_FETCH_CANCEL,CONFIGURATION_SERVER_FETCH,
        //CONFIGURATION_SERVER_FETCH_FULFILLED,CONFIGURATION_SERVER_FETCH_REJECTED
    
       
    
const Epics=combineEpics(provaEpic,fulfilledEpic,rejectedEpic,completeEpic/*,observer*/);
  export default Epics;