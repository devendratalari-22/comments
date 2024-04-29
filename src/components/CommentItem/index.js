import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeStyle = isLiked ? 'button active' : 'button'
  const postedTime = formatDistanceToNow(date)
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    const {isLikedIcon} = props
    isLikedIcon(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial-name">{initial}</p>
        </div>
        <div>
          <div className="user-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button type="button" className={likeStyle} onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          data-test="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}
export default CommentItem
