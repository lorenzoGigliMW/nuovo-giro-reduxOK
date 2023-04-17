import {
  CONFIGURATION_SERVER_FETCH, CONFIGURATION_SERVER_FETCH_CANCEL, CONFIGURATION_SERVER_FETCH_FULFILLED,
  CONFIGURATION_SERVER_FETCH_REJECTED,

  TASK_ADD,TASK_EDIT,TASK_CANCEL,TASK_TOGGLED,TASK_SEEALL//,TASK_VISUALTODO
} from '../actions/prova';
export const selectors = {
    tasks: state => state.tasks
  }


  const DATA = [];


const initialState = {
    tasks: DATA
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case TASK_ADD:
        return {
            ...state,
            tasks: [...state.tasks, action.text]
        };
    case TASK_EDIT:
        return {
            ...state,
              tasks:state.tasks.map(task => task.id === action.id ? {...task, name: action.newName} : task)

        };
        case TASK_CANCEL:
          return {
              ...state,
              tasks: [...state.tasks].filter((elem) => elem.id !== action.id)
          };
      case TASK_TOGGLED:
          return {
              ...state,
             tasks:state.tasks.map(task => task.id === action.id ? {...task, completed:!task.completed} : task)
          };
      case TASK_SEEALL:
          return {
              ...state,
              tasks:state.tasks.map(task => (true) ? {...task,completed:true} : task)
          };
      // case TASK_VISUALTODO:
      //   return {
      //     ...state,
      //     tasks:[...action.tasks]
      //       };
      case CONFIGURATION_SERVER_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchStatus: `fetching... ${(new Date()).toLocaleString()}`,
        data: null,
        lastUpdate: null
      };
    case CONFIGURATION_SERVER_FETCH_FULFILLED:
      return {
        ...state,
        tasks: action.data,
        isFetching: false,
        fetchStatus: `Results from ${(new Date()).toLocaleString()}`,
        lastUpdate: action.lastUpdate
      };
    case CONFIGURATION_SERVER_FETCH_REJECTED:
      return {
        ...state,
        isFetching: false,
        fetchStatus: `errored: ${action.err}`
      };
    case CONFIGURATION_SERVER_FETCH_CANCEL:
      return {
        ...state,
        isFetching: false,
        fetchStatus: 'user cancelled'
      };
        default:
          return state;
    }

  }
