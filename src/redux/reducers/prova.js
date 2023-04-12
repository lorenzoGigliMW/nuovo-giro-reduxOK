import {
  TASK_ADD,TASK_EDIT,TASK_CANCEL,TASK_TOGGLED,TASK_SEEALL//,TASK_VISUALTODO
} from '../actions/prova';
export const selectors = {
    tasks: state => state.tasks
  }  
  
  
  const DATA = [
  { id: "todo-0", name: "Eat", completed: false },
  { id: "todo-1", name: "Sleep", completed: true },
  { id: "todo-2", name: "Repeat", completed: false }
];


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
      //     tasks:[...state.tasks]
      //       };
        default:
          return state;
    }
    
  }