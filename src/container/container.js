import App from "../App";
import {tasksFetchEdit, tasksFetchSeeAll, tasksFetchToggle ,tasksFetchAdd,tasksFetchCancel} from "../redux/actions/todos";
import{connect} from 'react-redux'
import {selectors} from "../redux/reducers/prova";

// const mapStateToProps = (state) => {
//   return {
//     tasks: state.todos.tasks
//   };
// };
const mapStateToProps = () => {
  return {
    tasks: selectors.tasks
  };
};

  const mapDispatchToProps = (
    dispatch
  ) => {
    return {
      onTodoClick: (id,name) => {
        dispatch(tasksFetchCancel(id));
        dispatch(tasksFetchToggle(id));
        dispatch(tasksFetchAdd(name));
        dispatch(tasksFetchEdit(id,name));
        dispatch(tasksFetchSeeAll());
     }
    };
  };
  export default connect(mapStateToProps,mapDispatchToProps)(App);