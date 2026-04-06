import React from 'react'

interface StoryItemProps {
  image: string;
  name?: string;
  miniImage?: string;
  isYourStory?: boolean;
  type?: 'desktop' | 'mobile';
  status?: 'active' | 'inactive';
}

const StoryItem: React.FC<StoryItemProps> = ({ image, name, miniImage, isYourStory, type = 'desktop', status = 'active' }) => {
  if (type === 'mobile') {
    if (isYourStory) {
      return (
        <li className="_feed_inner_ppl_card_area_item">
          <a href="#0" className="_feed_inner_ppl_card_area_link">
            <div className="_feed_inner_ppl_card_area_story">
              <img src={image} alt="Image" className="_card_story_img" />
              <div className="_feed_inner_ppl_btn">
                <button className="_feed_inner_ppl_btn_link" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
          </a>
        </li>
      )
    }
    return (
      <li className="_feed_inner_ppl_card_area_item">
        <a href="#0" className="_feed_inner_ppl_card_area_link">
          <div className={status === 'active' ? '_feed_inner_ppl_card_area_story_active' : '_feed_inner_ppl_card_area_story_inactive'}>
            <img src={image} alt="Image" className="_card_story_img1" />
          </div>
          <p className="_feed_inner_ppl_card_area_txt">{name}</p>
        </a>
      </li>
    )
  }

  // Desktop
  if (isYourStory) {
    return (
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
        <div className="_feed_inner_ppl_card_box">
          <div className="_feed_inner_ppl_card_image">
            <img src={image} alt="Image" className="_card_ppl_img" />
            <div className="_feed_inner_ppl_btn">
              <button className="_feed_inner_ppl_btn_link" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                  <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="_feed_inner_ppl_card_txt">
            <p className="_feed_inner_ppl_card_para">Your Story</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
      <div className="_feed_inner_public_story _b_radious6">
        <div className="_feed_inner_public_story_image">
          <img src={image} alt="Image" className="_public_story_img" />
          <div className="_feed_inner_pulic_story_txt">
            <p className="_feed_inner_pulic_story_para">{name}</p>
          </div>
          {miniImage && (
            <div className="_feed_inner_public_mini">
              <img src={miniImage} alt="Image" className="_public_mini_img" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StoryItem
