import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  isLikedIcon = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        isLikedIcon={this.isLikedIcon}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comment-container">
          <h1 className="header">Comments</h1>
          <div className="content-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="form-text">say something about 4.0 Technologies</p>
              <input
                placeholder="Your Name"
                type="text"
                value={nameInput}
                className="input-text"
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                value={commentInput}
                rows="6"
                className="input-form"
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="button-style">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="bg-image"
              alt="comments"
            />
          </div>
          <hr className="hr-line" />
          <p className="comment-header">
            <span className="comment-counter"> {commentsList.length} </span>
            Comments
          </p>
          <ul className="comment-list">{this.renderCommentsList()} </ul>
        </div>
      </div>
    )
  }
}
export default Comments
