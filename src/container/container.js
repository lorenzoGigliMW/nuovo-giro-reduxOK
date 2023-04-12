import App from "../App";
//import {tasksFetchEdit, tasksFetchSeeAll, tasksFetchToggle ,tasksFetchAdd,tasksFetchCancel} from "../redux/actions/todos";
import {taskEdit,taskAdd,taskCancel,taskToggle,taskSeeAll/*,taskVisualTodo*/} from "../redux/actions/prova"
import{connect} from 'react-redux'
//import {selectors} from "../redux/reducers/prova";

// const mapStateToProps = (state) => {
//   return {
//     tasks: state.todos.tasks
//   };
// };
const mapStateToProps = (state) => {
  
  return {
    tasks:state.prova.tasks
  };
};

  const mapDispatchToProps = (
    dispatch
  ) => {
    return {
      taskAdd :(name)=>dispatch(taskAdd(name)),
      taskEdit: (id,name) =>dispatch(taskEdit(id,name)),
      taskCancel:(id)=> dispatch(taskCancel(id)),
      taskToggle:(id)=>dispatch(taskToggle(id)),
      taskSeeAll:()=> dispatch(taskSeeAll()),
      //taskVisualTodo:()=> dispatch(taskVisualTodo())
    };
  };
  export default connect(mapStateToProps,mapDispatchToProps)(App);