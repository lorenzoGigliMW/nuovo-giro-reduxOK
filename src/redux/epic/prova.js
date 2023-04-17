import {mergeMap } from 'rxjs/operators';
import { from, of,catchError,map,PartialObserver,mapTo  } from 'rxjs';
import axios from 'axios';
import { combineEpics } from 'redux-observable';
import { TASK_VISUALTODO, taskAdd,CONFIGURATION_SERVER_FETCH_FULFILLED,CONFIGURATION_SERVER_FETCH_CANCEL,CONFIGURATION_SERVER_FETCH,
    CONFIGURATION_SERVER_FETCH_REJECTED, configurationServerFetchRejected, configurationServerFetch, configurationServerFetchFulfilled} from '../actions/prova';
import { ofType } from 'redux-observable';


 
    // const observer = {
    //         next: () =>of(configurationServerFetch),
    //         error:  ()=> of(configurationServerFetchRejected),
    //         complete: () =>of(configurationServerFetchFulfilled)
    //     };

  //CONFIGURATION_SERVER_FETCH_REJECTED,CONFIGURATION_SERVER_FETCH,CONFIGURATION_SERVER_FETCH_FULFILLED

//   const myPromise = new Promise((resolve, reject) => {
//     });
const provaEpic = action$ => action$.pipe(
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(TASK_VISUALTODO),
    mergeMap(action => from(axios.get('http://localhost:3005/api/todos')).pipe(
        // map(response => of(configurationServerFetchFulfilled(response.data))),
        // catchError (err => of( configurationServerFetchRejected(err))),
        mergeMap(response => {
            //response.data.forEach(element => {
                  
            let newArr = [...response.data];
            let arrayBono = []

            newArr.map(elem => {
                let dataElem = taskAdd(elem)
                 arrayBono.push(dataElem);

            // if (response.data)
        
            //     next => console.log('next:', next),
            // else{
            //     err => console.log('error:', err)}
                // response.end => console.log('Completed'),


                // newArr.subscribe(
                //     next => console.log('next:', next),
                //     err => console.log('error:', err),
                //     () => console.log('Completed'),
                //     );  


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
            // subscribe(
                // next => console.log('next:', next);
                // err => console.log('error:', err);
                // () => console.log('Completed');
            //   );
            
        },

        // catchError(err => console.log(err))
         //  catchError(err => of(qualcosa(err)))
        // startWith(loadingData())

        //,CONFIGURATION_SERVER_FETCH_CANCEL,CONFIGURATION_SERVER_FETCH,
        //CONFIGURATION_SERVER_FETCH_FULFILLED,CONFIGURATION_SERVER_FETCH_REJECTED

      ))//.subscribe(observer)
  
//   .subscribe(
//     response => console.log(response),
//     error => console.log(error)
//   )

//.catchError(err => of(loadDataFailed(err)))
  )  );

//   const observer: PartialObserver<number> = {
//     next(value) {console.log(value)},
//     complete() {console.log('complete')}
//   };
//   arrayBono.subscribe(observer);
 
  const fulfilledEpic = action$ => action$.pipe(
    // filter(action => action.type === TASK_VISUALTODO),
    ofType(CONFIGURATION_SERVER_FETCH_FULFILLED),
    mergeMap(action => from(axios.get('http://localhost:3005/api/fulfilled')).pipe(
        mergeMap(response => {
             
            if(response.catchError) {configurationServerFetchRejected(response.catchError) /*console.log('error')*/}
                   else {configurationServerFetchFulfilled()/*console.log(response.data)*/};
                 
                  
            // let newArr = [...response.data];

            // let arrayBono = []
            // newArr.map(elem => {
            //     let dataElem = configurationServerFetchFulfilled(elem)
            //     arrayBono.push(dataElem)
                
            // })
            // return of(...arrayBono);
           
        }))));
    // const rejectedEpica = action$ => action$.pipe(
            // filter(action => action.type === TASK_VISUALTODO),
//             ofType(CONFIGURATION_SERVER_FETCH_REJECTED),
//             mapTo({ type: CONFIGURATION_SERVER_FETCH_REJECTED })
// )
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