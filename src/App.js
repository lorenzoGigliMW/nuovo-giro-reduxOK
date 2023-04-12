import React, { Component } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import PropTypes from 'prop-types';
import axios from 'axios';

const FILTER_MAP = {    //vari campi di Filtraggio e funzionalità
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);   //Array di filters name

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      tasks:props.tasks
    }
    this.listHeadingRef = React.createRef();
  }
  setFilter(filter) {
    this.setState({filter: filter})
  }
  setTasks(taskk) {
    this.setState({tasks: taskk})
  }



  //AGGIUNGO UNA TASK
  addTask = (idAdd, nameAdd) => {

    // axios.post('http://localhost:3005/api/todo/add', { id: idAdd, name: nameAdd }, {
    // }, //{ id: idAdd, name: nameAdd }
    // )
    //   .then(function (response) {
    //     //this.setTasks({id:response.id,name:response.name})
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });                //aggiunge task
    const newTask = { id: idAdd, name: nameAdd, completed: false };
    //this.setTasks([...this.state.tasks, newTask])
    this.props.taskAdd(newTask)
    //alert("task "+ name +" aggiunta");

  }

    //EDITO UNA TASK
    editTask = (id, newName) => {
      this.props.taskEdit(id,newName)
      // axios.post('http://localhost:3005/api/todo/edit/' + id, { name: newName }, {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json',
      // },)
      //   .then((res) => {
      //     //this.setTasks({ name: res.newName })
      //     console.log(res.data)
      //     //this.visualizzaTodo();
      //   }).catch((error) => {
      //     console.log(error)
      //   });
  
      // const editedTaskList = this.state.tasks().map((task) => {
      //   // if this task has the same ID as the edited task
      //   if (id === task.id) {
      //     //
      //     return { ...task, name: newName }
      //   }
      //   return task;
      // });
     // this.setTasks(editedTaskList);  
    }

  //ELIMINO UNA TASK
  deleteTask = (id) => {
    this.props.taskCancel(id)
    // axios.delete('http://localhost:3005/api/todo/del/' + id, {}, {})
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // const remainingTasks =this.state.tasks.filter((task) => id !== task.id);
    // this.setTasks(remainingTasks); 
  }



  //RICONOSCE IL CLICK INVERTE COMPLETED SU UNA TASK
  toggleTaskCompleted = (id) => { 
    this.props.taskToggle(id)
    // const updatedTasks = this.state.tasks.map((task) => {
    //   // if this task has the same ID as the edited task
    //   if (id === task.id) {
    //     // use object spread to make a new object
    //     // whose `completed` prop has been inverted
    //     return { ...task, completed: !task.completed }
    //   }
    //   return task;
    // });
    // this.setTasks(updatedTasks); 
  }

    //SETTO COMPLETED A TRUE PER TUTTE LE TASK
    mostraTodo = () => {
      // axios.post('http://localhost:3005/api/todos', {
      // }, {})//
      //   .then(function (response) {
      //     //this.setTasks(response.data)
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });  
    //    const TaskCompleted = this.state.tasks.map((task) => {
    //     return {...task,completed: true };   
    // }) 
      
    //   //this.visualizzaTodo();      
    //   this.setTasks(TaskCompleted); 
      this.props.taskSeeAll();     //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

  //VISUALIZZA LISTA TASK DATO UN FILTRO
  taskList = () => {
    const tastksState = this.props.tasks 
    return tastksState.filter(FILTER_MAP[this.state.filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
      />
    ))
  };

  filterList = () => FILTER_NAMES.map((name) => (
    
    <FilterButton                         // invoco filterButton con i seguenti props
      key={name}
      name={name}
      //selezionato={this.state.filter}
      isPressed={name === this.state.filter}
      setFilter={() => this.setFilter(name)}
    />
    
  ));

  //GET VISUALIZZA TASKS
  visualizzaTodo = () => {//filtro
    //contesto della funzione dentro
    axios.get('http://localhost:3005/api/todos')
      .then((response) => {

        //this.setTasks(response.data) //////////////
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  // this.props.taskVisualTodo()
  // }
  componentDidMount = () => {

    //visualizza task che non hanno un determinato id "eliminato"
    this.visualizzaTodo();
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
   
    if (this.state.tasks.length !== prevState.tasks.length) {
      this.listHeadingRef.current.focus();
    }
  }

  render = () => {
    const tasksNoun = this.taskList().length !== 1 ? 'tasks' : 'task';
    const headingText = `${this.taskList().length} ${tasksNoun} remaining`;

    return (

      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
        <div className="filters btn-group stack-exception">
          {this.filterList()}
          
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>
          {headingText}
        </h2>
        <ul
         // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"//
        >
          {this.taskList()}
        </ul>
        <h1>Mostra Todo</h1>
        <button type="submit" onClick={() => this.mostraTodo(/*this.state.tasks.id,this.state.tasks.completed*/)}>Click to lista Todo</button>
      </div>
    );
  }
}

App.propType = {
  tasks: PropTypes.array
}

App.defaultProps = {
 // tasks: DATA
  tasks: []
} 
export default App;


