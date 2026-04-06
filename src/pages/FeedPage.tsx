import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Stories from '../components/Feed/Stories'
import CreatePost from '../components/Feed/CreatePost'
import PostCard from '../components/Feed/PostCard'
import { RootState, AppDispatch } from '../store'
import { fetchPosts } from '../store/feedSlice'
import { CircularProgress, Box, Typography } from '@mui/material'

const FeedPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, loadingMore, hasMore, lastId, error, isInitialized } = useSelector((state: RootState) => state.feed)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleLoadMore = () => {
    if (lastId) {
      dispatch(fetchPosts(lastId))
    }
  }

  return (
    <div className="_feed_inner_area">
      <Stories />
      <CreatePost />
      <div className="_feed_inner_timeline">
        {loading && posts.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {isInitialized && posts.length === 0 && !error && (
          <Box sx={{ p: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography color="textSecondary">
              Be the first to share something with the community!
            </Typography>
          </Box>
        )}

        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {hasMore && posts.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            {loadingMore ? (
              <CircularProgress size={24} />
            ) : (
              <button 
                onClick={handleLoadMore} 
                className="_feed_inner_text_area_btn_link"
                style={{ width: '100%', maxWidth: '200px' }}
              >
                Load More
              </button>
            )}
          </Box>
        )}
      </div>
    </div>
  )
}

export default FeedPage
