export const selectors = {
    tasks: state => state
  }  

export const setTasks=(taskk)=> {
    // this.setState({ tasks: taskk })
   selectors.tasks=taskk
};
const initialState = {
    tasks: []
};

export default function reducer(state = initialState, action) {
    
            return state;
    }
    
