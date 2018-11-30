import Popup from "reactjs-popup";
import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

class TextBox extends Component {

  constructor(props) {
    super(props);
    this.state = { comments: [], isShow: false };
  }

  handleClick = () => {
    // toggles the menu opened state
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
    this.props.handleClick(this.props.boxIndex);
  }

  render() {
    return (
      <div className="App">
        <div className="rowC">
          <textarea style={{ width: '80%', resize: 'none' }}
            rows="4" cols="50" name="comment" form="usrform" placeholder="Start Typing..."></textarea>
          <div>

            <Popup
              trigger={<input type="image" src={require("../img/commentImage.png")} alt="Submit" width="28" height="28" />}
              modal
              contentStyle={contentStyle}
            >
              {close => (
                <div className="modal">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Please enter a comment: </div>
                  <div className="content">
                    {" "}

                    <textarea id="commentBox" style={{ width: '80%', resize: 'none' }}
                      rows="4" cols="50" placeholder="Your comment here...."></textarea>

                  </div>
                  <div className="actions">
                    <button
                      className="button"
                      onClick={() => {

                        let newComment = document.getElementById("commentBox").value;

                        if (newComment !== '') {

                          this.setState({ isShow: true })
                          this.state.comments.unshift(newComment);
                          this.setState({ comments: this.state.comments });

                          this.props.updateComments(newComment,this.props.boxIndex);
                          close();
                        }

                      }}
                    >
                      Add
                   </button>

                    <button className="button" onClick={() => { close() }}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Popup>

            <br />

            {(() => {
              for(let i = 0 ; i<this.props.commentFromBox.length;i++)
              {
                if(this.props.commentFromBox[i]==this.props.boxIndex)
                return this.props.comments.length > 0 ? <input onClick={this.handleClick} type="image" src={require("../img/showCommentImage.png")} alt="Submit" width="28" height="28" /> : null
              }
              })()

            }
          </div>

        </div>

      </div>
    );
  }
}

export default connect((state) => {

  return { ...state }
})(TextBox);