export const TASK_ADD = 'TASK_ADD';
export const TASK_EDIT = 'TASK_EDIT';
export const TASK_CANCEL= 'TASK_CANCEL';
export const TASK_TOGGLED= 'TASK_TOGGLED';
export const TASK_SEEALL= 'TASK_SEEALL';
export const TASK_VISUALTODO= 'TASK_SEEALL';

export const actionTypes = {
    TASK_ADD,
    TASK_EDIT,
    TASK_CANCEL,
    TASK_TOGGLED,
    TASK_SEEALL,
    TASK_VISUALTODO
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
  
  export const taskVisualTodo = () => ({
    type: TASK_VISUALTODO   
  });
  
  export const actions = {
    taskAdd,
    taskEdit,
    taskSeeAll,
    taskToggle,
    taskCancel,
    taskVisualTodo
  };