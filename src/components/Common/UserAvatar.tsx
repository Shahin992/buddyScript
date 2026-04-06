import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface UserAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  to?: string;
  status?: boolean;
  style?: React.CSSProperties;
}

const DEFAULT_AVATAR = "/assets/images/profile.png";

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt = "Profile Image", className = "", to, status, style }) => {
  const avatarSrc = src || DEFAULT_AVATAR;
  const content = <img src={avatarSrc} alt={alt} className={className} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />

  return (
    <div className={`_user_avatar_wrap ${status ? '_status_online' : ''}`} style={style}>
      {to ? (
        <RouterLink to={to}>
          {content}
        </RouterLink>
      ) : (
        content
      )}
      {status !== undefined && (
        <div className="_status_indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
            <rect width="12" height="12" x="1" y="1" fill={status ? "#0ACF83" : "#C4C4C4"} stroke="#fff" strokeWidth="2" rx="6" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
