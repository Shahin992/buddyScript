import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, Divider } from '@mui/material'
import { X } from 'lucide-react'
import UserAvatar from './UserAvatar'
import { postService } from '../../services/post.service'

interface LikedByModalProps {
  open: boolean;
  onClose: () => void;
  targetId: string;
  type: 'post' | 'comment' | 'reply';
}

const LikedByModal: React.FC<LikedByModalProps> = ({ open, onClose, targetId, type }) => {
  const [likes, setLikes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && targetId) {
      const fetchLikes = async () => {
        setLoading(true)
        try {
          let response;
          if (type === 'post') {
            response = await postService.getPostLikes(targetId)
          } else if (type === 'comment') {
            response = await postService.getCommentLikes(targetId)
          } else {
            response = await postService.getReplyLikes(targetId)
          }
          if (response.success) {
            setLikes(response.data || [])
          }
        } catch (err) {
          console.error('Failed to fetch likes:', err)
        } finally {
          setLoading(false)
        }
      }
      fetchLikes()
    }
  }, [open, targetId, type])

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="liked-by-modal">
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        outline: 'none',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="h2" fontWeight={600}>
            Liked By
          </Typography>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : likes.length === 0 ? (
            <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              No likes yet
            </Typography>
          ) : (
            <List>
              {likes.map((user, idx) => (
                <ListItem key={idx}>
                  <ListItemAvatar>
                    <UserAvatar src={user.avatar} style={{ width: 40, height: 40 }} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`${user.firstName} ${user.lastName}`} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

export default LikedByModal
