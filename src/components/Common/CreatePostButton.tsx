import React from 'react'

interface CreatePostButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ icon, label, onClick, className = "" }) => {
  return (
    <div className={`${className} _feed_common`}>
      <button type="button" onClick={onClick} className="_feed_inner_text_area_bottom_photo_link"> 
        <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img"> 
          {icon}
        </span>
        {label}
      </button>
    </div>
  )
}

export default CreatePostButton
