import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Dashboards
  {
    path: '/dashboard/alpha',
    Component: lazy(() => import('Pages/dashboard/alpha')),
    exact: true,
  },
  {
    path: '/dashboard/beta',
    Component: lazy(() => import('Pages/dashboard/beta')),
    exact: true,
  },
  {
    path: '/dashboard/gamma',
    Component: lazy(() => import('Pages/dashboard/gamma')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: lazy(() => import('Pages/dashboard/crypto')),
    exact: true,
  },

  // Ecommerce
  {
    path: '/ecommerce/dashboard',
    Component: lazy(() => import('Pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    Component: lazy(() => import('Pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/product-catalog',
    Component: lazy(() => import('Pages/ecommerce/product-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    Component: lazy(() => import('Pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    Component: lazy(() => import('Pages/ecommerce/cart')),
    exact: true,
  },

  // Apps
  {
    path: '/apps/messaging',
    Component: lazy(() => import('Pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/calendar',
    Component: lazy(() => import('Pages/apps/calendar')),
    exact: true,
  },
  {
    path: '/apps/mail',
    Component: lazy(() => import('Pages/apps/mail')),
    exact: true,
  },
  {
    path: '/apps/profile',
    Component: lazy(() => import('Pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    Component: lazy(() => import('Pages/apps/gallery')),
    exact: true,
  },
  // Extra Apps
  {
    path: '/apps/github-explore',
    Component: lazy(() => import('Pages/apps/github-explore')),
    exact: true,
  },
  {
    path: '/apps/github-discuss',
    Component: lazy(() => import('Pages/apps/github-discuss')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-droplets',
    Component: lazy(() => import('Pages/apps/digitalocean-droplets')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-create',
    Component: lazy(() => import('Pages/apps/digitalocean-create')),
    exact: true,
  },
  {
    path: '/apps/google-analytics',
    Component: lazy(() => import('Pages/apps/google-analytics')),
    exact: true,
  },
  {
    path: '/apps/wordpress-post',
    Component: lazy(() => import('Pages/apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/apps/wordpress-posts',
    Component: lazy(() => import('Pages/apps/wordpress-posts')),
    exact: true,
  },
  {
    path: '/apps/wordpress-add',
    Component: lazy(() => import('Pages/apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/apps/todoist-list',
    Component: lazy(() => import('Pages/apps/todoist-list')),
    exact: true,
  },
  {
    path: '/apps/jira-dashboard',
    Component: lazy(() => import('Pages/apps/jira-dashboard')),
    exact: true,
  },
  {
    path: '/apps/jira-agile-board',
    Component: lazy(() => import('Pages/apps/jira-agile-board')),
    exact: true,
  },
  {
    path: '/apps/helpdesk-dashboard',
    Component: lazy(() => import('Pages/apps/helpdesk-dashboard')),
    exact: true,
  },
  // Widgets
  {
    path: '/widgets/general',
    Component: lazy(() => import('Pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: lazy(() => import('Pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: lazy(() => import('Pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: lazy(() => import('Pages/widgets/charts')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: lazy(() => import('Pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: lazy(() => import('Pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: lazy(() => import('Pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: lazy(() => import('Pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: lazy(() => import('Pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: lazy(() => import('Pages/tables/antd')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: lazy(() => import('Pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: lazy(() => import('Pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: lazy(() => import('Pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: lazy(() => import('Pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: lazy(() => import('Pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: lazy(() => import('Pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: lazy(() => import('Pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: lazy(() => import('Pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: lazy(() => import('Pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: lazy(() => import('Pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: lazy(() => import('Pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: lazy(() => import('Pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: lazy(() => import('Pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: lazy(() => import('Pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: lazy(() => import('Pages/advanced/colors')),
    exact: true,
  },
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('Pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/verify',
    Component: lazy(() => import('Pages/auth/verify-email')),
    exact: true,
  },
  {
    path: '/auth/verify/:id',
    Component: lazy(() => import('Pages/auth/verify-email')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('Pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/change-password',
    Component: lazy(() => import('Pages/auth/change-password')),
    exact: true,
  },
  {
    path: '/auth/change-password/:id',
    Component: lazy(() => import('Pages/auth/change-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('Pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('Pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('Pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('Pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
