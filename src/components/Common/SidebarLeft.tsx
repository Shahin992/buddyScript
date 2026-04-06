import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import SidebarExploreItem from './SidebarExploreItem'
import SuggestedUserItem from './SuggestedUserItem'
import ReusableCard from './ReusableCard'
import { AppIcon } from './AppIcon'
import EventItem from './EventItem'
import { logout } from '../../store/authSlice'
import { EXPLORE_DATA, SUGGESTED_PEOPLE_DATA, EVENT_DATA } from '../../data/mockData'

const SidebarLeft: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="_layout_left_sidebar_wrap">
      <div className="_layout_left_sidebar_inner">
        <ReusableCard padding="_padd_t24 _padd_b6 _padd_r24 _padd_l24">
          <SectionHeader title="Explore" />
          <ul className="_left_inner_area_explore_list">
            {EXPLORE_DATA.map(item => (
              <SidebarExploreItem 
                key={item.id}
                label={item.label} 
                badgeContent={item.badge} 
                icon={<AppIcon type={item.iconType} />} 
              />
            ))}
          </ul>
        </ReusableCard>
      </div>

      <div className="_layout_left_sidebar_inner">
        <ReusableCard padding="_padd_t24 _padd_b6 _padd_r24 _padd_l24">
          <SectionHeader title="Suggested People" linkText="See All" linkTo="/find-friends" />
          {SUGGESTED_PEOPLE_DATA.map(user => (
            <SuggestedUserItem 
              key={user.id}
              name={user.name} 
              description={user.description} 
              image={user.image} 
            />
          ))}
        </ReusableCard>
      </div>

      <div className="_layout_left_sidebar_inner">
        <ReusableCard padding="_padd_t24 _padd_b6 _padd_r24 _padd_l24">
          <SectionHeader title="Events" linkText="See All" linkTo="/events" />
          {EVENT_DATA.map(event => (
            <EventItem 
              key={event.id}
              id={event.id}
              title={event.title}
              image={event.image}
              dateDay={event.dateDay}
              dateMonth={event.dateMonth}
              attendees={event.attendees}
            />
          ))}
        </ReusableCard>
      </div>

      {/* Premium Sidebar Logout */}
      <div className="_layout_left_sidebar_inner">
        <div 
          onClick={handleLogout}
          style={{ 
            cursor: 'pointer', 
            padding: '16px', 
            backgroundColor: 'white',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: '#FF4D4F',
            fontWeight: 700,
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#FFF1F0';
            e.currentTarget.style.borderColor = '#FFCCC7';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout Account
        </div>
      </div>
    </div>
  )
}

export default SidebarLeft
