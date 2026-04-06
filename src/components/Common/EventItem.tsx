import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface EventItemProps {
  id: number;
  title: string;
  image: string;
  dateDay: string;
  dateMonth: string;
  attendees: number;
}

const EventItem: React.FC<EventItemProps> = ({ id, title, image, dateDay, dateMonth, attendees }) => {
  return (
    <RouterLink className="_left_inner_event_card_link" to={`/event/${id}`}>
      <div className="_left_inner_event_card">
        <div className="_left_inner_event_card_iamge">
          <img src={image} alt={title} className="_card_img" />
        </div>
        <div className="_left_inner_event_card_content">
          <div className="_left_inner_card_date">
            <p className="_left_inner_card_date_para">{dateDay}</p>
            <p className="_left_inner_card_date_para1">{dateMonth}</p>
          </div>
          <div className="_left_inner_card_txt">
            <h4 className="_left_inner_event_card_title">{title}</h4>
          </div>
        </div>
        <hr className="_underline" />
        <div className="_left_inner_event_bottom">
          <p className="_left_iner_event_bottom">{attendees} People Going</p> 
          <a href="#0" className="_left_iner_event_bottom_link" onClick={(e) => e.preventDefault()}>Going</a>
        </div>
      </div>
    </RouterLink>
  )
}

export default EventItem
