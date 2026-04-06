import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import UserAvatar from './UserAvatar'

interface SuggestedUserItemProps {
  name: string;
  description: string;
  image: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  layout?: 'left' | 'right';
  time?: string;
}

const SuggestedUserItem: React.FC<SuggestedUserItemProps> = ({ name, description, image, buttonLabel = "Connect", onButtonClick, layout = 'left', time }) => {
  if (layout === 'right') {
    return (
      <div className="_feed_right_inner_area_card_ppl _mar_b16">
        <div className="_feed_right_inner_area_card_ppl_box">
          <div className="_feed_right_inner_area_card_ppl_image">
            <UserAvatar src={image} to="/profile" className="_box_ppl_img" />
          </div>
          <div className="_feed_right_inner_area_card_ppl_txt">
            <RouterLink to="/profile">
              <h4 className="_feed_right_inner_area_card_ppl_title">{name}</h4>
            </RouterLink>
            <p className="_feed_right_inner_area_card_ppl_para">{description}</p>
          </div>
        </div>
        <div className="_feed_right_inner_area_card_ppl_side">
          {time ? <span>{time}</span> : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
              <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
            </svg>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="_left_inner_area_suggest_info _mar_b16">
      <div className="_left_inner_area_suggest_info_box">
        <div className="_left_inner_area_suggest_info_image">
          <UserAvatar src={image} to="/profile" className="_info_img1" />
        </div>
        <div className="_left_inner_area_suggest_info_txt">
          <RouterLink to="/profile">
            <h4 className="_left_inner_area_suggest_info_title">{name}</h4>
          </RouterLink>
          <p className="_left_inner_area_suggest_info_para">{description}</p>
        </div>
      </div>
      <div className="_left_inner_area_suggest_info_link">
        <button type="button" onClick={onButtonClick} className="_info_link" style={{ background: 'transparent', border: 'none', padding: 0 }}>
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default SuggestedUserItem
