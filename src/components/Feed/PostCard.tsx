import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLikePost, fetchComments, addComment, Post } from '../../store/feedSlice'
import { AppDispatch, RootState } from '../../store'
import UserAvatar from '../Common/UserAvatar'
import PostButton from '../Common/PostButton'
import { CircularProgress } from '@mui/material'
import CommentItem from './CommentItem'
import { useToast } from '../Common/ToastProvider'
import LikedByModal from '../Common/LikedByModal'

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLikesModal, setShowLikesModal] = useState(false)
  
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { showToast } = useToast()

  const handleLike = async () => {
    try {
      await dispatch(toggleLikePost(post.id)).unwrap()
    } catch (err) {
      showToast('Failed to toggle like', 'error')
    }
  }

  const toggleComments = () => {
    if (!showComments && !post.commentsList) {
      dispatch(fetchComments(post.id))
    }
    setShowComments(!showComments)
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await dispatch(addComment({ postId: post.id, content: commentText })).unwrap()
      setCommentText('')
    } catch (err) {
      showToast('Failed to add comment', 'error')
      console.error('Failed to add comment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <UserAvatar src={post.authorImg} className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{post.author}</h4>
              <p className="_feed_inner_timeline_post_box_para">{post.time} . 
                <a href="#0">{post.privacy === 'PUBLIC' ? 'Public' : 'Private'}</a>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button onClick={() => setShowDropdown(!showDropdown)} className="_feed_timeline_post_dropdown_link">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
            <div className={`_feed_timeline_dropdown _timeline_dropdown ${showDropdown ? '_show' : ''}`} style={{ display: showDropdown ? 'block' : 'none' }}>
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                  <a href="#0" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"/>
                      </svg>															  
                    </span>
                    Save Post	
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
        {post.contentImg && (
          <div className="_feed_inner_timeline_image">
            <img src={post.contentImg} alt="" className="_time_img" />
          </div>
        )}
      </div>
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {post.likes > 0 && (
            <div 
              className="_feed_inner_timeline_total_reacts_image_inner" 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              onClick={() => setShowLikesModal(true)}
            >
              <img src="/assets/images/react_img1.png" alt="Image" className="_react_img1" />
              <img src="/assets/images/react_img2.png" alt="Image" className="_react_img" />
              <p className="_feed_inner_timeline_total_reacts_para" style={{ marginLeft: '8px' }}>{post.likes}</p>
            </div>
          )}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <a onClick={toggleComments} style={{ cursor: 'pointer' }}><span>{post.comments || 0}</span> Comment</a>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2"><span>{post.shares || 0}</span> Share</p>
        </div>
      </div>
      <div className="_feed_inner_timeline_reaction">
        <PostButton 
            active={post.isLiked} 
            onClick={handleLike} 
            label={post.isLiked ? 'Liked' : 'Haha'} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill={post.isLiked ? "#FFCC4D" : "#eee"} viewBox="0 0 19 19"><path fill={post.isLiked ? "#FFCC4D" : "#eee"} d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"/><path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"/><path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"/><path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"/></svg>} 
        />
        <PostButton 
            onClick={toggleComments}
            label="Comment" 
            icon={<svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21"><path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"/><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"/></svg>} 
        />
        <PostButton 
            label="Share" 
            icon={<svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21"><path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"/></svg>} 
        />
      </div>

      {showComments && (
        <div className="_feed_comment_section">
          {/* Comment List */}
          <div className="_feed_comment_list" style={{ padding: '0 24px' }}>
            {post.loadingComments ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <CircularProgress size={24} />
              </div>
            ) : (
              post.commentsList?.map((comment) => (
                <CommentItem key={comment.id} postId={post.id} comment={comment}/>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <div className="_feed_inner_timeline_cooment_area" style={{ borderTop: '1px solid #efefef', paddingTop: '16px', paddingLeft: '24px', paddingRight: '24px' }}> 
            <div className="_feed_inner_comment_box">
              <form onSubmit={handleCommentSubmit} className="_feed_inner_comment_box_form">
                <div className="_feed_inner_comment_box_content">
                  <div className="_feed_inner_comment_box_content_image">
                    <UserAvatar src={user?.avatar} className="_comment_img" />
                  </div>
                  <div className="_feed_inner_comment_box_content_txt">
                    <textarea 
                      className="form-control _comment_textarea" 
                      placeholder="Write a comment..." 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit(e);
                        }
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="_feed_inner_comment_box_icon">
                  <button type="submit" disabled={isSubmitting || !commentText.trim()} className="_feed_inner_comment_box_icon_btn" style={{ border: 'none', background: 'none' }}>
                    {isSubmitting ? <CircularProgress size={16} /> : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={commentText.trim() ? "#1890FF" : "currentColor"} viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <LikedByModal 
        open={showLikesModal} 
        onClose={() => setShowLikesModal(false)} 
        targetId={post.id} 
        type="post" 
      />
    </div>
  )
}

export default PostCard
