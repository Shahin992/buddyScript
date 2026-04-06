import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Comment, toggleLikeComment, fetchReplies, addReply, toggleLikeReply } from '../../store/feedSlice'
import { AppDispatch, RootState } from '../../store'
import UserAvatar from '../Common/UserAvatar'
import { CircularProgress } from '@mui/material'
import { Heart } from 'lucide-react'
import LikedByModal from '../Common/LikedByModal'

interface CommentItemProps {
  postId: string;
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ postId, comment }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRepliesList, setShowRepliesList] = useState(false)
  const [likesModal, setLikesModal] = useState<{ open: boolean, id: string, type: 'comment' | 'reply' }>({ open: false, id: '', type: 'comment' })
  
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLike = () => {
    dispatch(toggleLikeComment({ postId, commentId: comment.id }))
  }

  const handleLikeReply = (replyId: string) => {
    dispatch(toggleLikeReply({ postId, commentId: comment.id, replyId }))
  }

  const openLikesModal = (id: string, type: 'comment' | 'reply') => {
    setLikesModal({ open: true, id, type })
  }

  const toggleReplies = () => {
    if (!showRepliesList && !comment.repliesList) {
      dispatch(fetchReplies({ postId, commentId: comment.id }))
    }
    setShowRepliesList(!showRepliesList)
  }

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await dispatch(addReply({ postId, commentId: comment.id, content: replyText })).unwrap()
      setReplyText('')
      setShowReplyInput(false)
      setShowRepliesList(true)
    } catch (err) {
      console.error('Failed to add reply:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="_feed_comment_item_wrapper" style={{ marginBottom: '16px' }}>
      <div className="_feed_comment_item" style={{ display: 'flex', gap: '12px' }}>
        <div className="_feed_comment_author_avatar">
          <UserAvatar src={comment.authorImg} className="_comment_img" />
        </div>
        <div style={{ flex: 1 }}>
          <div className="_feed_comment_bubble" style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: '18px', display: 'inline-block', maxWidth: '100%' }}>
            <h4 className="_feed_comment_author_name" style={{ fontSize: '13px', fontWeight: 600, margin: 0 }}>{comment.author}</h4>
            <p className="_feed_comment_text" style={{ fontSize: '14px', margin: '4px 0 0' }}>{comment.content}</p>
          </div>
          
          <div className="_feed_comment_actions" style={{ display: 'flex', gap: '16px', marginTop: '4px', paddingLeft: '12px', fontSize: '12px', fontWeight: 600, color: '#65676b' }}>
            <span 
              onClick={handleLike} 
              style={{ cursor: 'pointer', color: comment.isLiked ? '#1890FF' : 'inherit' }}
            >
              Like
            </span>
            {comment.likes > 0 && (
              <span 
                onClick={() => openLikesModal(comment.id, 'comment')}
                style={{ cursor: 'pointer', color: '#1890FF' }}
              >
                ({comment.likes})
              </span>
            )}
            <span onClick={() => setShowReplyInput(!showReplyInput)} style={{ cursor: 'pointer' }}>Reply</span>
            <span style={{ fontWeight: 400 }}>{comment.time}</span>
          </div>

          {comment.replies > 0 && (
            <div 
              onClick={toggleReplies} 
              style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#65676b', marginTop: '8px', paddingLeft: '12px' }}
            >
              {showRepliesList ? 'Hide Replies' : `View ${comment.replies} Replies`}
            </div>
          )}

          {showRepliesList && (
            <div className="_feed_reply_list" style={{ marginTop: '8px', paddingLeft: '12px' }}>
              {comment.loadingReplies ? (
                <CircularProgress size={16} />
              ) : (
                comment.repliesList?.map(reply => (
                  <div key={reply.id} className="_feed_reply_item" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <UserAvatar src={reply.authorImg} style={{ width: '24px', height: '24px' }} />
                    <div style={{ flex: 1 }}>
                      <div className="_feed_comment_bubble" style={{ background: '#f0f2f5', padding: '6px 10px', borderRadius: '14px', display: 'inline-block' }}>
                        <h4 style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>{reply.author}</h4>
                        <p style={{ fontSize: '13px', margin: '2px 0 0' }}>{reply.content}</p>
                      </div>
                      <div className="_feed_comment_actions" style={{ display: 'flex', gap: '12px', marginTop: '2px', paddingLeft: '8px', fontSize: '11px', fontWeight: 600, color: '#65676b' }}>
                        <span 
                          onClick={() => handleLikeReply(reply.id)} 
                          style={{ cursor: 'pointer', color: reply.isLiked ? '#1890FF' : 'inherit' }}
                        >
                          Like
                        </span>
                        {reply.likes > 0 && (
                          <span 
                            onClick={() => openLikesModal(reply.id, 'reply')}
                            style={{ cursor: 'pointer', color: '#1890FF' }}
                          >
                            ({reply.likes})
                          </span>
                        )}
                        <span style={{ fontWeight: 400 }}>{reply.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {showReplyInput && (
            <form onSubmit={handleReplySubmit} style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <UserAvatar src={user?.avatar} style={{ width: '24px', height: '24px' }} />
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                autoFocus
                style={{ borderRadius: '18px', fontSize: '13px' }}
              />
              <button type="submit" disabled={isSubmitting || !replyText.trim()} style={{ background: 'none', border: 'none', color: '#1890FF', fontWeight: 600 }}>
                {isSubmitting ? <CircularProgress size={14} /> : 'Reply'}
              </button>
            </form>
          )}
        </div>
      </div>
      <LikedByModal 
        open={likesModal.open} 
        onClose={() => setLikesModal({ ...likesModal, open: false })} 
        targetId={likesModal.id} 
        type={likesModal.type} 
      />
    </div>
  )
}

export default CommentItem
