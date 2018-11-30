import React, { Component } from 'react';

import '../css/index.css'
import '../img/commentImage.png'
import '../img/showCommentImage.png'
import '../css/sidebar.css';

import TextBox from './TextBox'

import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import Comments from '../component/Comments';

import { connect } from 'react-redux';


class Slate extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { comments: [], status: [], isShow: false, showAll: 0, searchWord: '' };
    
  }

  componentWillMount() {
    this.setState({
      isMenuOpened: false
    })
  }

  updateComments = (newComment,boxIndex) => {

    this.state.comments.push(newComment);
    this.state.status.push(0);
        this.setState({comments : this.state.comments,status:this.state.status,isShow : true});
    this.props.dispatch({ type: 'newCommentInsert', comment: newComment, boxIndex : boxIndex })


  }

  serachComments = () => {
    this.state.searchWord = document.getElementById("searchbox").value;
    this.setState({ searchWord: this.state.searchWord });

  
  }

  editComment = (index, comment) => {
    this.state.comments[index] = comment;
    this.setState({ comments: this.state.comments });

    this.props.dispatch({ type: 'editComment', index: index ,comment : comment })
  }

  setStatus = (index, status) => {
    this.state.status[index] = status;
    this.setState({ status: this.state.status });

    this.props.dispatch({ type : 'setStatus', index : index ,status : status })
  }

  deleteComment = (index) => {
    this.state.comments.splice(index, 1);
    this.state.status.splice(index, 1);
    this.setState({ comments: this.state.comments, status: this.state.status });
    this.props.dispatch({ type : 'deleteComment', index: index })

  }


  handleClick = (index) => {

    this.setState({ isMenuOpened: !this.state.isMenuOpened });
    this.props.dispatch({ type: 'changeCurrentBox', index : index })
  }

  openDrawer = () => {

    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }

  changeShowAll = () => {

    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue == "All") {
      this.setState({ showAll: 0 })
    }

    else if (selectedValue == "Open") {
      this.setState({ showAll: 1 })
    }

    else if (selectedValue == "Resolved") {
      this.setState({ showAll: 2 })
    }


  }



  render() {
    return (
      <div className="App" >

      <div class="sidenav">

        <input onClick={this.openDrawer} style={{marginLeft : '2px', float: 'left' }} type="image" src={require("../img/dashboard.png")} alt="Submit" width="20" height="20"/>
        <br />
  
</div>


       {/* <button onClick={this.handleClick} style={{ float: 'left' }}>Side Menu</button> 
        <input onClick={this.handleClick} style={{ float: 'left' }} type="image" src={require("../img/dashobard.png")} alt="Submit" width="20" height="20"/>
        <br />
        <br/>

        */ }

        <div>

          {(()=>{

            let boxes=[];

            for(let i=0;i<4;i++){

              boxes.push( <TextBox boxIndex={i} updateComments={this.updateComments} handleClick={this.handleClick} />)
              boxes.push(<br/>)
            
            }

            return boxes;

          })()}

          <br />


        </div>



        <OffCanvas style={{ fontSize: '14px' }} width={300} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"left"}>
          <OffCanvasBody className="bodyClass" style={{ fontSize: '12px' }}>
            <p>

              {//keep this empty
              }

            </p>

          </OffCanvasBody>
          <OffCanvasMenu style={{marginLeft : '24px',paddingBottom : '100px', overflow: 'auto' }} className="menuClass" >

            <div >

              <p>Comments</p>

              <input id="searchbox" onChange={this.serachComments} type="text" placeholder="Search.." name="search" />
              <button onClick={this.serachComments} type="submit"><i className="fa fa-search"></i></button>
              <br />
              <br />

              <select id="selectBox" onChange={this.changeShowAll} style={{ width: '75%' }}>
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
              </select>

              <div>

                <br />
                <br />


                {(() => {
                  let comment = []
                  for (let i = 0; i < this.props.comments.length; i++) {
                    if(this.props.commentFromBox[i]==this.props.curruntBox){

                    if (this.state.showAll == 0) {
                      if (this.state.searchWord == '') {
                        comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                        comment.push(<br />)
                      }

                      else if (this.state.comments[i].indexOf(this.state.searchWord) > -1) {
                        comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                        comment.push(<br />)
                      }

                      else continue;
                    }

                    else if (this.state.showAll == 1) {
                      if (this.state.status[i] == 0) {
                        if (this.state.searchWord == '') {
                          comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                          comment.push(<br />)
                        }

                        else if (this.state.comments[i].indexOf(this.state.searchWord) > -1) {
                          comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                          comment.push(<br />)
                        }

                        else continue;
                      }
                    }

                    else if (this.state.showAll == 2) {
                      if (this.state.status[i] == 1) {
                        if (this.state.searchWord == '') {
                          comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                          comment.push(<br />)
                        }

                        else if (this.state.comments[i].indexOf(this.state.searchWord) > -1) {
                          comment.push(<Comments editComment={this.editComment} setStatus={this.setStatus} deleteComment={this.deleteComment} index={i} statusValue={this.state.status[i]} comment={this.state.comments[i]} />)
                          comment.push(<br />)
                        }

                        else continue;
                      }
                    }

                  }

                }

                  

                  return comment
                })()}



              </div>

            </div>


          </OffCanvasMenu>
        </OffCanvas>

      </div>
    );
  }
}

export default connect((state) => {

  return { ...state }

})(Slate);
