import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Common/Navbar'
import SidebarLeft from '../components/Common/SidebarLeft'
import SidebarRight from '../components/Common/SidebarRight'

const MainLayout: React.FC = () => {
  return (
    <div className="_mode_light">
      <div className="_layout_main_wrapper">
        <Navbar />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row g-0">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 d-none d-lg-block _left_sidebar_scroll">
                <SidebarLeft />
              </div>

              {/* Middle Section */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-12 _middle_content_scroll">
                <div className="_layout_middle_inner">
                  <Outlet />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 d-none d-lg-block _right_sidebar_scroll">
                <SidebarRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
