//post
export const TASK_ADD = 'TASK_ADD';
export const TASK_EDIT = 'TASK_EDIT';
export const TASK_CANCEL= 'TASK_CANCEL';
export const TASK_TOGGLED= 'TASK_TOGGLED';
export const TASK_SEEALL= 'TASK_SEEALL';
//get
export const CONFIGURATION_SERVER_FETCH_CANCEL = 'CONFIGURATION_SERVER_FETCH_CANCEL';
export const TASK_VISUALTODO= 'TASK_VISUALTODO';
export const CONFIGURATION_SERVER_FETCH = 'CONFIGURATION_SERVER_FETCH';
export const CONFIGURATION_SERVER_FETCH_FULFILLED = 'CONFIGURATION_SERVER_FETCH_FULFILLED';
export const CONFIGURATION_SERVER_FETCH_REJECTED = 'CONFIGURATION_SERVER_FETCH_REJECTED';

export const actionTypes = {
    TASK_ADD,
    TASK_EDIT,
    TASK_CANCEL,
    TASK_TOGGLED,
    TASK_SEEALL,
//
    TASK_VISUALTODO,
    CONFIGURATION_SERVER_FETCH_CANCEL,
    CONFIGURATION_SERVER_FETCH,
    CONFIGURATION_SERVER_FETCH_FULFILLED,
    CONFIGURATION_SERVER_FETCH_REJECTED
  };

// action creators
export const taskAdd = (text) => ({
    type: TASK_ADD,
    text
  });

  export const taskEdit = (id,newName) => ({
    type: TASK_EDIT,
    newName,
    id
  });
  export const taskCancel = (id) => (
    {
      type: TASK_CANCEL,
      id
    }
  );
  export const taskToggle = (id) => ({
    type: TASK_TOGGLED,
   id
  });
  export const taskSeeAll = () => ({
    type: TASK_SEEALL
  });
  //
  export const taskVisualTodo = () => ({
    type: TASK_VISUALTODO
  });
  export const configurationServerFetch = () => ({
    type: CONFIGURATION_SERVER_FETCH
  });
  export const configurationServerFetchCancel = () => ({
      type: CONFIGURATION_SERVER_FETCH_CANCEL
  });
  export const configurationServerFetchFulfilled = (data, lastUpdate) => ({
    type: CONFIGURATION_SERVER_FETCH_FULFILLED,
    data: data,
    lastUpdate: lastUpdate
  });
  export const configurationServerFetchRejected = err => ({
    type: CONFIGURATION_SERVER_FETCH_REJECTED,
    err,
    error: true
  });

  export const actions = {
    taskAdd,
    taskEdit,
    taskSeeAll,
    taskToggle,
    taskCancel,
//
    taskVisualTodo,
    configurationServerFetch,
    configurationServerFetchCancel,
    configurationServerFetchFulfilled,
    configurationServerFetchRejected
  };
