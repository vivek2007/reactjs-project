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
    Component: lazy(() => import('../src/pages/dashboard/alpha')),
    exact: true,
  },
  {
    path: '/dashboard/beta',
    Component: lazy(() => import('../src/pages/dashboard/beta')),
    exact: true,
  },
  {
    path: '/dashboard/gamma',
    Component: lazy(() => import('../src/pages/dashboard/gamma')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: lazy(() => import('../src/pages/dashboard/crypto')),
    exact: true,
  },

  // Ecommerce
  {
    path: '/ecommerce/dashboard',
    Component: lazy(() => import('../src/pages/ecommerce/dashboard')),
    exact: true,
  },
  {
    path: '/ecommerce/orders',
    Component: lazy(() => import('../src/pages/ecommerce/orders')),
    exact: true,
  },
  {
    path: '/ecommerce/product-catalog',
    Component: lazy(() => import('../src/pages/ecommerce/product-catalog')),
    exact: true,
  },
  {
    path: '/ecommerce/product-details',
    Component: lazy(() => import('../src/pages/ecommerce/product-details')),
    exact: true,
  },
  {
    path: '/ecommerce/cart',
    Component: lazy(() => import('../src/pages/ecommerce/cart')),
    exact: true,
  },

  // Apps
  {
    path: '/apps/messaging',
    Component: lazy(() => import('../src/pages/apps/messaging')),
    exact: true,
  },
  {
    path: '/apps/calendar',
    Component: lazy(() => import('../src/pages/apps/calendar')),
    exact: true,
  },
  {
    path: '/apps/mail',
    Component: lazy(() => import('../src/pages/apps/mail')),
    exact: true,
  },
  {
    path: '/apps/profile',
    Component: lazy(() => import('../src/pages/apps/profile')),
    exact: true,
  },
  {
    path: '/apps/gallery',
    Component: lazy(() => import('../src/pages/apps/gallery')),
    exact: true,
  },
  // Extra Apps
  {
    path: '/apps/github-explore',
    Component: lazy(() => import('../src/pages/apps/github-explore')),
    exact: true,
  },
  {
    path: '/apps/github-discuss',
    Component: lazy(() => import('../src/pages/apps/github-discuss')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-droplets',
    Component: lazy(() => import('../src/pages/apps/digitalocean-droplets')),
    exact: true,
  },
  {
    path: '/apps/digitalocean-create',
    Component: lazy(() => import('../src/pages/apps/digitalocean-create')),
    exact: true,
  },
  {
    path: '/apps/google-analytics',
    Component: lazy(() => import('../src/pages/apps/google-analytics')),
    exact: true,
  },
  {
    path: '/apps/wordpress-post',
    Component: lazy(() => import('../src/pages/apps/wordpress-post')),
    exact: true,
  },
  {
    path: '/apps/wordpress-posts',
    Component: lazy(() => import('../src/pages/apps/wordpress-posts')),
    exact: true,
  },
  {
    path: '/apps/wordpress-add',
    Component: lazy(() => import('../src/pages/apps/wordpress-add')),
    exact: true,
  },
  {
    path: '/apps/todoist-list',
    Component: lazy(() => import('../src/pages/apps/todoist-list')),
    exact: true,
  },
  {
    path: '/apps/jira-dashboard',
    Component: lazy(() => import('../src/pages/apps/jira-dashboard')),
    exact: true,
  },
  {
    path: '/apps/jira-agile-board',
    Component: lazy(() => import('../src/pages/apps/jira-agile-board')),
    exact: true,
  },
  {
    path: '/apps/helpdesk-dashboard',
    Component: lazy(() => import('../src/pages/apps/helpdesk-dashboard')),
    exact: true,
  },
  // Widgets
  {
    path: '/widgets/general',
    Component: lazy(() => import('../src/pages/widgets/general')),
    exact: true,
  },
  {
    path: '/widgets/lists',
    Component: lazy(() => import('../src/pages/widgets/lists')),
    exact: true,
  },
  {
    path: '/widgets/tables',
    Component: lazy(() => import('../src/pages/widgets/tables')),
    exact: true,
  },
  {
    path: '/widgets/charts',
    Component: lazy(() => import('../src/pages/widgets/charts')),
    exact: true,
  },
  // Cards
  {
    path: '/cards/basic-cards',
    Component: lazy(() => import('../src/pages/cards/basic-cards')),
    exact: true,
  },
  {
    path: '/cards/tabbed-cards',
    Component: lazy(() => import('../src/pages/cards/tabbed-cards')),
    exact: true,
  },
  // UI Kits
  {
    path: '/ui-kits/bootstrap',
    Component: lazy(() => import('../src/pages/ui-kits/bootstrap')),
    exact: true,
  },
  {
    path: '/ui-kits/antd',
    Component: lazy(() => import('../src/pages/ui-kits/antd')),
    exact: true,
  },
  // Tables
  {
    path: '/tables/bootstrap',
    Component: lazy(() => import('../src/pages/tables/bootstrap')),
    exact: true,
  },
  {
    path: '/tables/antd',
    Component: lazy(() => import('../src/pages/tables/antd')),
    exact: true,
  },
  // Charts
  {
    path: '/charts/chartistjs',
    Component: lazy(() => import('../src/pages/charts/chartistjs')),
    exact: true,
  },
  {
    path: '/charts/chartjs',
    Component: lazy(() => import('../src/pages/charts/chartjs')),
    exact: true,
  },
  {
    path: '/charts/c3',
    Component: lazy(() => import('../src/pages/charts/c3')),
    exact: true,
  },
  // Icons
  {
    path: '/icons/feather-icons',
    Component: lazy(() => import('../src/pages/icons/feather-icons')),
    exact: true,
  },
  {
    path: '/icons/fontawesome',
    Component: lazy(() => import('../src/pages/icons/fontawesome')),
    exact: true,
  },
  {
    path: '/icons/linearicons-free',
    Component: lazy(() => import('../src/pages/icons/linearicons-free')),
    exact: true,
  },
  {
    path: '/icons/icomoon-free',
    Component: lazy(() => import('../src/pages/icons/icomoon-free')),
    exact: true,
  },
  // Advanced
  {
    path: '/advanced/form-examples',
    Component: lazy(() => import('../src/pages/advanced/form-examples')),
    exact: true,
  },
  {
    path: '/advanced/email-templates',
    Component: lazy(() => import('../src/pages/advanced/email-templates')),
    exact: true,
  },
  {
    path: '/advanced/utilities',
    Component: lazy(() => import('../src/pages/advanced/utilities')),
    exact: true,
  },
  {
    path: '/advanced/grid',
    Component: lazy(() => import('../src/pages/advanced/grid')),
    exact: true,
  },
  {
    path: '/advanced/typography',
    Component: lazy(() => import('../src/pages/advanced/typography')),
    exact: true,
  },
  {
    path: '/advanced/pricing-tables',
    Component: lazy(() => import('../src/pages/advanced/pricing-tables')),
    exact: true,
  },
  {
    path: '/advanced/invoice',
    Component: lazy(() => import('../src/pages/advanced/invoice')),
    exact: true,
  },
  {
    path: '/advanced/colors',
    Component: lazy(() => import('../src/pages/advanced/colors')),
    exact: true,
  },
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('../src/pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('../src/pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/register',
    Component: lazy(() => import('../src/pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('../src/pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('../src/pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('../src/pages/auth/500')),
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
