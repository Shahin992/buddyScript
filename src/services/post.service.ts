import httpRequest from '../api/httpRequest';

export const postService = {
  getPosts: async (cursor?: string) => {
    return httpRequest.get(`/posts${cursor ? `?cursor=${cursor}` : ''}`);
  },

  createPost: async (postData: { content: string, images?: string[], privacy?: string }) => {
    return httpRequest.post('/posts', postData);
  },

  uploadPhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return httpRequest.post('/upload/photo', formData, true);
  },

  likePost: async (postId: string) => {
    return httpRequest.post(`/posts/${postId}/like`);
  },

  getComments: async (postId: string) => {
    return httpRequest.get(`/comments/posts/${postId}/comments`);
  },

  addComment: async (postId: string, content: string) => {
    return httpRequest.post(`/comments/posts/${postId}/comment`, { content });
  },

  toggleLikeComment: async (commentId: string) => {
    return httpRequest.post(`/comments/${commentId}/like`);
  },

  toggleLikeReply: async (replyId: string) => {
    return httpRequest.post(`/comments/reply/${replyId}/like`);
  },

  addReply: async (commentId: string, content: string) => {
    return httpRequest.post(`/comments/comment/${commentId}/reply`, { content });
  },

  getReplies: async (commentId: string) => {
    return httpRequest.get(`/comments/comment/${commentId}/replies`);
  },

  getPostLikes: async (postId: string) => {
    return httpRequest.get(`/posts/${postId}/likes`);
  },

  getCommentLikes: async (commentId: string) => {
    return httpRequest.get(`/comments/${commentId}/likes`);
  },

  getReplyLikes: async (replyId: string) => {
    return httpRequest.get(`/comments/reply/${replyId}/likes`);
  },
};
