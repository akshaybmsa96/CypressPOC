import React, { Component } from 'react';
import '../App.css';
import Popup from "reactjs-popup";
import Reply from '../component/Reply';
import { connect } from 'react-redux';

class Comments extends Component {



  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { replies : [],temp : '' };

  }

      onActionChange = () =>
      {

        let selectBox = document.getElementsByClassName("selectBoxAction")[this.props.index];
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;

        if(selectedValue=="Delete")
        {
         
          this.props.deleteComment(this.props.index);
          this.setState({replies : []});
          selectBox.selectedIndex = "0";
        }

        else if(selectedValue=="Resolve")
        {
          this.props.setStatus(this.props.index,1);
          selectBox.selectedIndex = "0";
        }

      }

      editComment = () => {

  

      }

  render() {
    return (
      <div>
      <div style={{fontSize:'12px',padding: '5px'}} className="commentBox">


      <p><b>Comment : </b> {this.props.comment} <br/>
       <b>Replies : </b> {this.state.replies.length}<br/>
       
       <b>Status : </b> {this.props.statusValue==0?"OPEN":"RESOLVED"}</p>
      <p><select onChange={this.onActionChange} className="selectBoxAction" id="selectBoxAction">
      <option value="-Select-">Select</option>
     
       <option value="Resolve">Resolve</option>
       <option value="Delete">Delete</option>
      </select></p>

      <p>

{(()=>{
  let replies=[]
  for(let i=0;i<this.state.replies.length;i++){
   
    replies.push(<Reply reply={this.state.replies[i]} index={i}/>)
    replies.push(<br/>)
  
  }
  return replies
})()}

      </p>

      <Popup modal trigger={  <button >Reply</button> } position="top center">

{close => (
                <div className="modal">
          
                  <div className="content">
                    {" "}

                    <textarea id="replyBox" style={{width:'100%',resize:'none'}} 
                rows="4" cols="50" name="comment"></textarea> 
              
              <button className="button" onClick={()=>{

                let reply = document.getElementById("replyBox").value;

                if(reply!='')
                {
                this.state.replies.unshift(reply);
                this.setState({replies: this.state.replies});
                document.getElementById("replyBox").value='';  
              }

              close();
            

              }}>Reply</button>
                  

                  </div>
                </div>
              )}

          </Popup>

       <Popup modal trigger={  <button>Edit</button> } position="top center">

       {close => (
                <div className="modal">
          
                  <div className="content">
                    {" "}

                   <textarea id="editBox" style={{width:'80%',resize:'none'}} 
                rows="4" cols="50" name="comment">{this.props.comment}</textarea> 
              
              <button className="button" onClick={()=>{

                if(document.getElementById("editBox").value!='')
                {
                this.props.editComment(this.props.index,document.getElementById("editBox").value);
                }

                close();
            
              }}>Done</button>
                  

                  </div>
                </div>
              )}

      
          </Popup>


      </div>
        

      </div>
    );
  }
}

export default connect((state)=>{

  return {...state}

})(Comments);
