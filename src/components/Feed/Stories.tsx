import React from 'react'
import StoryItem from './StoryItem'
import { STORIES_DATA } from '../../data/mockData'

const Stories: React.FC = () => {
  return (
    <div className="_feed_inner_ppl_card _mar_b16">
      {/*For Desktop*/}
      <div className="_feed_inner_ppl_card_desktop">
        <div className="row">
          {STORIES_DATA.map(story => (
            <StoryItem 
              key={story.id}
              isYourStory={story.isYourStory} 
              image={story.image} 
              name={story.name}
              miniImage={story.miniImage} 
            />
          ))}
        </div>
      </div>
      
      {/*For Mobile*/}
      <div className="_feed_inner_ppl_card_mobile _mar_b16">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            {STORIES_DATA.map(story => (
              <StoryItem 
                key={story.id}
                type="mobile" 
                isYourStory={story.isYourStory} 
                image={story.image} 
                name={story.name ? story.name.substring(0, 7) + "..." : undefined} 
                status={story.id % 2 === 0 ? 'active' : 'inactive'}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Stories
