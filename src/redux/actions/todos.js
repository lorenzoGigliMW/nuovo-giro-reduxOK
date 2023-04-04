export const TASKS_FETCH_ADD = 'TASKS_FETCH_ADD';
export const TASKS_FETCH_CANCEL = 'TASKS_FETCH_CANCEL';
export const TASKS_FETCH_FULFILLED = 'TASKS_FETCH_FULFILLED';
export const TASKS_FETCH_REJECTED = 'TASKS_FETCH_REJECTED';
export const TASKS_FETCH_EDIT = 'TASKS_FETCH_EDIT';
export const TASKS_FETCH_TOGGLED = 'TASKS_FETCH_TOGGLED';
export const TASKS_FETCH_SEEALL = 'TASKS_FETCH_SEEALL';

export const actionTypes = {
    TASKS_FETCH_ADD,
    TASKS_FETCH_CANCEL,
    TASKS_FETCH_FULFILLED,
    TASKS_FETCH_REJECTED,
    TASKS_FETCH_EDIT,
    TASKS_FETCH_TOGGLED,
    TASKS_FETCH_SEEALL
  };

  
// action creators
export const tasksFetchAdd = (text) => ({
    type: TASKS_FETCH_ADD,
    text
  });
  export const tasksFetchCancel = (id) => (
    {
      type: TASKS_FETCH_CANCEL,
      id
    }
  );
  export const tasksFetchFulfilled = (data,lastUpdate) => ({
    type: TASKS_FETCH_FULFILLED,
    data,
    lastUpdate
  });
  export const tasksFetchRejected = err => ({
    type: TASKS_FETCH_REJECTED,
    err,
    error: true
  });
  export const tasksFetchEdit = (id,newName) => ({
    type: TASKS_FETCH_EDIT,
    name:newName,
    id
  });
  export const tasksFetchToggle = (id) => ({
    type: TASKS_FETCH_TOGGLED,
   id
  });
  export const tasksFetchSeeAll = () => ({
    type: TASKS_FETCH_SEEALL   
  });
  
  export const actions = {
    tasksFetchAdd,
    tasksFetchCancel,
    tasksFetchFulfilled,
    tasksFetchRejected,
    tasksFetchEdit,
    tasksFetchToggle,
    tasksFetchSeeAll
  };