import React from 'react'
import ReusableCard from './ReusableCard'
import SectionHeader from './SectionHeader'
import SuggestedUserItem from './SuggestedUserItem'
import SearchInput from './SearchInput'
import { YOU_MIGHT_LIKE_DATA, FRIENDS_DATA } from '../../data/mockData'

const SidebarRight: React.FC = () => {
  return (
    <div className="_layout_right_sidebar_wrap">
      <div className="_layout_right_sidebar_inner">
        <ReusableCard>
          <SectionHeader title="You Might Like" linkText="See All" linkTo="/find-friends" />
          <hr className="_underline" />
          {YOU_MIGHT_LIKE_DATA.map(user => (
            <SuggestedUserItem 
              key={user.id}
              name={user.name} 
              description={user.description} 
              image={user.image} 
              buttonLabel="Follow"
            />
          ))}
        </ReusableCard>
      </div>

      <div className="_layout_right_sidebar_inner">
        <ReusableCard padding="_padd_t24 _padd_b6 _padd_r24 _padd_l24">
          <div className="_feed_top_fixed">
            <SectionHeader title="Your Friends" linkText="See All" linkTo="/find-friends" />
            <SearchInput className="_mar_b24" />
          </div>
          <div className="_feed_bottom_fixed">
            {FRIENDS_DATA.map(user => (
              <SuggestedUserItem 
                key={user.id}
                layout="right"
                name={user.name} 
                description={user.description} 
                image={user.image} 
                time={user.id === 1 ? "5 minute ago" : undefined}
              />
            ))}
          </div>
        </ReusableCard>
      </div>
    </div>
  )
}

export default SidebarRight
