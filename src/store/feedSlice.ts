import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { postService } from '../services/post.service'

export interface Reply {
  id: string;
  author: string;
  authorImg: string;
  content: string;
  time: string;
  likes: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  authorImg: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
  isLiked?: boolean;
  repliesList?: Reply[];
  loadingReplies?: boolean;
}

export interface Post {
  id: string;
  author: string;
  authorImg: string;
  time: string;
  content: string;
  contentImg?: string;
  likes: number;
  comments: number;
  shares: number;
  privacy: 'PUBLIC' | 'PRIVATE';
  isLiked?: boolean;
  commentsList?: Comment[];
  loadingComments?: boolean;
  likesList?: any[]; 
}

interface FeedState {
  posts: Post[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  lastId: string | null;
  error: string | null;
  isInitialized: boolean;
}

const initialState: FeedState = {
  posts: [],
  loading: false,
  loadingMore: false,
  hasMore: true,
  lastId: null,
  error: null,
  isInitialized: false,
}

const formatPost = (backendPost: any): Post => ({
  id: backendPost._id,
  author: `${backendPost.author?.firstName || 'Unknown'} ${backendPost.author?.lastName || ''}`.trim(),
  authorImg: backendPost.author?.avatar || '/assets/images/people1.png',
  time: new Date(backendPost.createdAt).toLocaleString(),
  content: backendPost.content,
  contentImg: backendPost.images && backendPost.images.length > 0 ? backendPost.images[0] : undefined,
  likes: backendPost.likesCount || 0,
  comments: backendPost.commentsCount || 0, 
  shares: 0,
  privacy: backendPost.privacy || 'PUBLIC',
  isLiked: backendPost.isLiked || false,
});

const formatComment = (backendComment: any): Comment => ({
  id: backendComment._id,
  author: `${backendComment.author?.firstName || 'User'} ${backendComment.author?.lastName || ''}`.trim(),
  authorImg: backendComment.author?.avatar || '/assets/images/comment_img.png',
  content: backendComment.content,
  time: new Date(backendComment.createdAt).toLocaleString(),
  likes: backendComment.likesCount || 0,
  replies: backendComment.repliesCount || 0,
  isLiked: backendComment.isLiked || false,
});

const formatReply = (backendReply: any): Reply => ({
  id: backendReply._id,
  author: `${backendReply.author?.firstName || 'User'} ${backendReply.author?.lastName || ''}`.trim(),
  authorImg: backendReply.author?.avatar || '/assets/images/comment_img.png',
  content: backendReply.content,
  time: new Date(backendReply.createdAt).toLocaleString(),
  likes: backendReply.likesCount || 0,
  isLiked: backendReply.isLiked || false,
});

export const fetchPosts = createAsyncThunk(
  'feed/fetchPosts',
  async (cursor: string | undefined, { rejectWithValue }) => {
    try {
      const response = await postService.getPosts(cursor);
      return { 
        postsData: response.data.map(formatPost),
        cursor 
      };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk(
  'feed/createPost',
  async (postData: { content: string, images?: string[], privacy?: string }, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData);
      return formatPost(response.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const toggleLikePost = createAsyncThunk(
  'feed/toggleLike',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response: any = await postService.likePost(postId);
      return { postId, status: response.message };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'feed/fetchComments',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await postService.getComments(postId);
      return { postId, comments: (response.data as any[]).map(formatComment) };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  'feed/addComment',
  async ({ postId, content }: { postId: string, content: string }, { rejectWithValue }) => {
    try {
      const response = await postService.addComment(postId, content);
      return { postId, comment: formatComment(response.data) };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const toggleLikeComment = createAsyncThunk(
  'feed/toggleLikeComment',
  async ({ postId, commentId }: { postId: string, commentId: string }, { rejectWithValue }) => {
    try {
      await postService.toggleLikeComment(commentId);
      return { postId, commentId };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReplies = createAsyncThunk(
  'feed/fetchReplies',
  async ({ postId, commentId }: { postId: string, commentId: string }, { rejectWithValue }) => {
    try {
      const response = await postService.getReplies(commentId);
      return { postId, commentId, replies: (response.data as any[]).map(formatReply) };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const addReply = createAsyncThunk(
  'feed/addReply',
  async ({ postId, commentId, content }: { postId: string, commentId: string, content: string }, { rejectWithValue }) => {
    try {
      const response = await postService.addReply(commentId, content);
      return { postId, commentId, reply: formatReply(response.data) };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const toggleLikeReply = createAsyncThunk(
  'feed/toggleLikeReply',
  async ({ postId, commentId, replyId }: { postId: string, commentId: string, replyId: string }, { rejectWithValue }) => {
    try {
      await postService.toggleLikeReply(replyId);
      return { postId, commentId, replyId };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoadingIssues: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        if (!action.meta.arg) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        const { postsData, cursor } = action.payload;
        
        if (!cursor) {
          state.posts = postsData;
        } else {
          state.posts = [...state.posts, ...postsData];
        }

        state.hasMore = postsData.length === 10;
        if (postsData.length > 0) {
          state.lastId = postsData[postsData.length - 1].id;
        }
        state.isInitialized = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload as string;
        state.isInitialized = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(toggleLikePost.pending, (state, action) => {
        const post = state.posts.find(p => p.id === action.meta.arg);
        if (post) {
          (post as any)._oldLiked = post.isLiked;
          (post as any)._oldLikes = post.likes;
          
          if (post.isLiked) {
            post.likes -= 1;
            post.isLiked = false;
          } else {
            post.likes += 1;
            post.isLiked = true;
          }
        }
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          delete (post as any)._oldLiked;
          delete (post as any)._oldLikes;
        }
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        const post = state.posts.find(p => p.id === action.meta.arg);
        if (post && (post as any)._oldLiked !== undefined) {
          // Rollback
          post.isLiked = (post as any)._oldLiked;
          post.likes = (post as any)._oldLikes;
          delete (post as any)._oldLiked;
          delete (post as any)._oldLikes;
          state.error = action.payload as string;
        }
      })
      .addCase(fetchComments.pending, (state, action) => {
        const post = state.posts.find(p => p.id === action.meta.arg);
        if (post) post.loadingComments = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.loadingComments = false;
          post.commentsList = action.payload.comments;
        }
      })
      .addCase(addComment.pending, (state, action) => {
        const post = state.posts.find(p => p.id === action.meta.arg.postId);
        if (post) {
          post.comments += 1;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          if (!post.commentsList) post.commentsList = [];
          // We already incremented in pending, so no need here unless we want to be safe
          post.commentsList.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        const post = state.posts.find(p => p.id === (action.meta.arg as any).postId);
        if (post) {
          // Revert increment
          post.comments -= 1;
        }
      })
      .addCase(toggleLikeComment.pending, (state, action) => {
        const { postId, commentId } = action.meta.arg;
        const post = state.posts.find(p => p.id === postId);
        if (post && post.commentsList) {
          const comment = post.commentsList.find(c => c.id === commentId);
          if (comment) {
            comment.isLiked = !comment.isLiked;
            comment.likes += comment.isLiked ? 1 : -1;
          }
        }
      })
      .addCase(fetchReplies.pending, (state, action) => {
        const { postId, commentId } = action.meta.arg;
        const post = state.posts.find(p => p.id === postId);
        if (post && post.commentsList) {
          const comment = post.commentsList.find(c => c.id === commentId);
          if (comment) comment.loadingReplies = true;
        }
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        const { postId, commentId, replies } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post && post.commentsList) {
          const comment = post.commentsList.find(c => c.id === commentId);
          if (comment) {
            comment.loadingReplies = false;
            comment.repliesList = replies;
          }
        }
      })
      .addCase(addReply.fulfilled, (state, action) => {
        const { postId, commentId, reply } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post && post.commentsList) {
          const comment = post.commentsList.find(c => c.id === commentId);
          if (comment) {
            if (!comment.repliesList) comment.repliesList = [];
            comment.repliesList.push(reply);
            comment.replies += 1;
          }
        }
      })
      .addCase(toggleLikeReply.pending, (state, action) => {
        const { postId, commentId, replyId } = action.meta.arg;
        const post = state.posts.find(p => p.id === postId);
        if (post && post.commentsList) {
          const comment = post.commentsList.find(c => c.id === commentId);
          if (comment && comment.repliesList) {
            const reply = comment.repliesList.find(r => r.id === replyId);
            if (reply) {
              reply.isLiked = !reply.isLiked;
              reply.likes += reply.isLiked ? 1 : -1;
            }
          }
        }
      });
  }
})

export const { setLoadingIssues } = feedSlice.actions
export default feedSlice.reducer
