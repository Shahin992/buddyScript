import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkTo?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, linkText, linkTo, className = "_mar_b24" }) => {
  return (
    <div className={`_reusable_section_header _dis_flex _dis_flex_cntr1 ${className}`} style={{ justifyContent: 'space-between', width: '100%' }}>
      <h4 className="_title5" style={{ margin: 0 }}>{title}</h4>
      {linkText && linkTo && (
        <RouterLink to={linkTo} className="_feed_right_inner_area_card_content_txt_link" style={{ fontSize: '14px', fontWeight: 500, color: '#1890FF' }}>
          {linkText}
        </RouterLink>
      )}
    </div>
  )
}

export default SectionHeader
