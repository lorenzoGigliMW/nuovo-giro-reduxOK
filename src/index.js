import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Container from './container/container';
// import Contact from "./pages/Contact";
// import Blogs from "./pages/Blogs";
// import Navbar from "./pages/Navbar";
// import reducer from './redux/reducers/todos';
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import App from './App'
import configureStore/*,{store}*/ from '../src/utils/configureStore'

// const DATA = [
//   { id: "todo-0", name: "Eat", completed: true },
//   { id: "todo-1", name: "Sleep", completed: false },
//   { id: "todo-2", name: "Repeat", completed: false }
// ];
const preloadedState = window.__PRELOADED_STATE__


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode> 
    <Provider store={configureStore} serverState={preloadedState} >
      <Container/>
    </Provider>  
  </React.StrictMode>
);