import React from 'react'

interface ReusableCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  margin?: string;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ children, className = "", padding = "_padd_t24 _padd_b24 _padd_r24 _padd_l24", margin = "_mar_b16" }) => {
  return (
    <div className={`_b_radious6 _feed_inner_area ${padding} ${margin} ${className}`}>
      {children}
    </div>
  )
}

export default ReusableCard
