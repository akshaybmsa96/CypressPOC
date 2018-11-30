import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


let defaulState = {comments : [],status : [], commentFromBox : [] , curruntBox : 0 , isShow : false,showAll : 0, searchWord : ''}

const rootReducer = (state=defaulState,action)=> {

    switch(action.type){

      case 'switchflag' : 
      return {...state,isShow : false}

      case 'changeCurrentBox' :
      return {...state,curruntBox : action.index}

      case 'newCommentInsert' : 

      state.comments.push(action.comment);
      state.status.push(0);
      state.commentFromBox.push(action.boxIndex);
      state.curruntBox =  action.boxIndex;
      return {...state,comments : state.comments , status : state.status ,commentFromBox : state.commentFromBox,curruntBox : state.curruntBox }

      case 'editComment' : 

      state.comments[action.index] = action.comment;
      return {...state, comments: state.comments };

      case 'setStatus' :
     
        state.status[action.index] = action.status;
        return{...state, status : state.status };

        case 'deleteComment' :

        state.comments.splice(action.index, 1);
        state.status.splice(action.index, 1);
        state.commentFromBox.splice(action.index,1)
        
    
        return { comments: state.comments, status: state.status,commentFromBox : state.commentFromBox,curruntBox : state.curruntBox };
      

      default : 
      return {...state}

    }

}

const store = createStore(rootReducer)


ReactDOM.render( <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
