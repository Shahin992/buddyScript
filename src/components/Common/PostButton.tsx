import React from 'react'

interface PostButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const PostButton: React.FC<PostButtonProps> = ({ icon, label, onClick, active }) => {
  return (
    <button onClick={onClick} className={`_feed_reaction ${active ? '_feed_reaction_active' : ''}`}>
      <span className="_feed_inner_timeline_reaction_link"> 
        <span>
          {icon}
          {label}
        </span>
      </span>
    </button>
  )
}

export default PostButton
