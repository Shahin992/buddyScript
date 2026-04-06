import React from 'react'

export interface ExploreItem {
  id: number;
  label: string;
  badge?: string;
  iconType: 'learning' | 'insights' | 'friends' | 'bookmarks' | 'groups' | 'gaming' | 'settings' | 'save';
}

export interface SuggestedUser {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Story {
  id: number;
  name?: string;
  image: string;
  miniImage?: string;
  isYourStory?: boolean;
}

export const EXPLORE_DATA: ExploreItem[] = [
  { id: 1, label: 'Learning', badge: 'New', iconType: 'learning' },
  { id: 2, label: 'Insights', iconType: 'insights' },
  { id: 3, label: 'Find friends', iconType: 'friends' },
  { id: 4, label: 'Bookmarks', iconType: 'bookmarks' },
  { id: 5, label: 'Group', iconType: 'groups' },
  { id: 6, label: 'Gaming', badge: 'New', iconType: 'gaming' },
  { id: 7, label: 'Settings', iconType: 'settings' },
  { id: 8, label: 'Save post', iconType: 'save' },
];

export const SUGGESTED_PEOPLE_DATA: SuggestedUser[] = [
  { id: 1, name: 'Steve Jobs', description: 'CEO of Apple', image: '/assets/images/people1.png' },
  { id: 2, name: 'Ryan Roslansky', description: 'CEO of Linkedin', image: '/assets/images/people2.png' },
  { id: 3, name: 'Dylan Field', description: 'CEO of Figma', image: '/assets/images/people3.png' },
  { id: 4, name: 'Mark Zuckerberg', description: 'CEO of Meta', image: '/assets/images/people1.png' },
];

export const YOU_MIGHT_LIKE_DATA: SuggestedUser[] = [
  { id: 1, name: 'Radovan SkillArena', description: 'Founder & CEO at Trophy', image: '/assets/images/Avatar.png' },
  { id: 2, name: 'Jane Doe', description: 'Full Stack Developer', image: '/assets/images/people1.png' },
  { id: 3, name: 'John Smith', description: 'Project Manager', image: '/assets/images/people2.png' },
];

export const FRIENDS_DATA: SuggestedUser[] = [
  { id: 1, name: 'Steve Jobs', description: 'CEO of Apple', image: '/assets/images/people1.png' },
  { id: 2, name: 'Ryan Roslansky', description: 'CEO of Linkedin', image: '/assets/images/people2.png' },
  { id: 3, name: 'Dylan Field', description: 'CEO of Figma', image: '/assets/images/people3.png' },
  { id: 4, name: 'Software Engineer', description: 'Google', image: '/assets/images/people1.png' },
];

export const STORIES_DATA: Story[] = [
  { id: 1, isYourStory: true, image: '/assets/images/card_ppl2.png' },
  { id: 2, name: 'Ryan Roslansky', image: '/assets/images/card_ppl1.png', miniImage: '/assets/images/mini_pic.png' },
  { id: 3, name: 'John Doe', image: '/assets/images/card_ppl3.png', miniImage: '/assets/images/mini_pic.png' },
  { id: 4, name: 'Jane Smith', image: '/assets/images/card_ppl4.png', miniImage: '/assets/images/mini_pic.png' },
];

export interface Post {
  id: number;
  author: string;
  authorImg: string;
  time: string;
  content: string;
  contentImg?: string;
  likes: number;
  comments: number;
  shares: number;
}

export const POSTS_DATA: Post[] = [
  {
    id: 1,
    author: 'Dylan Field',
    authorImg: '/assets/images/people1.png',
    time: '1h ago',
    content: 'Just launched the new Figma components! Check them out.',
    contentImg: '/assets/images/timeline_img.png',
    likes: 124,
    comments: 12,
    shares: 5
  },
  {
    id: 2,
    author: 'Steve Jobs',
    authorImg: '/assets/images/people2.png',
    time: '3h ago',
    content: 'Design is not just what it looks like and feels like. Design is how it works.',
    likes: 540,
    comments: 42,
    shares: 122
  },
  {
    id: 3,
    author: 'Ryan Roslansky',
    authorImg: '/assets/images/people3.png',
    time: '5h ago',
    content: 'Excited to see the growth of professional networks this year.',
    contentImg: '/assets/images/post_img.png',
    likes: 89,
    comments: 7,
    shares: 2
  },
  {
    id: 4,
    author: 'Buddy Script Admin',
    authorImg: '/assets/images/post_img.png',
    time: '12h ago',
    content: 'Welcome to the new Buddy Script platform! Enjoy your stay.',
    likes: 1020,
    comments: 156,
    shares: 50
  }
];

export interface Event {
  id: number;
  title: string;
  dateDay: string;
  dateMonth: string;
  attendees: number;
  image: string;
}

export const EVENT_DATA: Event[] = [
  {
    id: 1,
    title: 'No more terrorism no more cry',
    dateDay: '10',
    dateMonth: 'Jul',
    attendees: 17,
    image: '/assets/images/feed_event1.png'
  }
];


