import React from 'react'

interface SidebarExploreItemProps {
  icon: React.ReactNode;
  label: string;
  badgeContent?: string;
  className?: string;
}

const SidebarExploreItem: React.FC<SidebarExploreItemProps> = ({ icon, label, badgeContent, className = "" }) => {
  return (
    <li className={`_left_inner_area_explore_item _explore_item ${className}`}>
      <a href="#0" className="_left_inner_area_explore_link">
        {icon}
        {label}
      </a>
      {badgeContent && <span className="_left_inner_area_explore_link_txt">{badgeContent}</span>}
    </li>
  )
}

export default SidebarExploreItem
