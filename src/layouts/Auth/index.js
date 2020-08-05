import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Sidebar from 'components/cleanui/layout/Sidebar'
import SupportChat from 'components/cleanui/layout/SupportChat'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({
  logo: settings.logo,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  authPagesColor: settings.authPagesColor,
})

const AuthLayout = ({
  children,
  logo,
  isGrayTopbar,
  isCardShadow,
  isSquaredBorders,
  isBorderless,
  authPagesColor,
}) => {
  return (
    <Layout>
      <Layout.Content>
        <Sidebar />
        <SupportChat />
        <div
          className={classNames(`${style.container}`, {
            cui__layout__squaredBorders: isSquaredBorders,
            cui__layout__cardsShadow: isCardShadow,
            cui__layout__borderless: isBorderless,
            [style.white]: authPagesColor === 'white',
            [style.gray]: authPagesColor === 'gray',
          })}
          style={{
            backgroundImage:
              authPagesColor === 'image' ? 'url(resources/images/content/photos/7.jpg)' : '',
          }}
        >
          <div
            className={classNames(`${style.topbar} mb-4`, {
              [style.topbarGray]: isGrayTopbar,
            })}
          >
            <div className={`${style.logoContainer} pl-2`}>
              <div className={style.logo}>
                <img
                  src="resources/images/site_logo.png"
                  className="mr-2"
                  alt="Clean UI"
                  style={{ width: '150px', height: '50px' }}
                />
                {/* <div className={style.name}>{logo}</div> */}
                {logo === 'Clicks' && <div className={style.descr}>React</div>}
              </div>
            </div>
            <div className="d-none d-sm-block">
              <span className="mr-2">Don&#39;t have an account?</span>
              <Link to="/auth/register" className="font-size-16 kit__utils__link">
                Sign up
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">{children}</div>
          <div className="mt-auto pb-5 pt-5">
            <div className="text-center">Copyright © 2020 Clicks</div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default withRouter(connect(mapStateToProps)(AuthLayout))
