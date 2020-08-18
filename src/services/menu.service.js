export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Home',
    },
    {
      title: 'Campaigns',
      key: 'dashboards',
      icon: 'fe fe-home',
      // roles: ['admin'], // set user roles with access to this route
      count: false,
      children: [
        {
          title: 'New Campaign',
          key: 'dashboardBeta',
          url: '/dashboard/beta',
        },
        {
          title: 'Calendar Scheduling',
          key: 'dashboard',
          url: '/apps/github-explore',
        },
        {
          title: 'Order History',
          key: 'orderHistory',
          url: '/order/order-history',
        },
        {
          title: 'Statistics and Analytics',
          key: 'extraAppsDigitaloceanDroplets',
          url: '/apps/digitalocean-droplets',
        },
      ],
    },
    {
      title: 'Compensation Plan',
      key: 'apps',
      icon: 'fe fe-dollar-sign',
      children: [
        {
          title: 'Referrals and Earnings',
          key: 'appsProfile',
          url: '/apps/profile',
        },
      ],
    },
    {
      title: 'Latest Posts',
      key: 'blogs',
      icon: 'fe fe-rss',
      children: [
        {
          title: 'Featured News',
          key: 'blogsPostsList',
          url: '/blog/posts-list',
        },
        {
          title: 'General Information',
          key: 'blogsPost',
          url: '/blog/add-post',
        },
      ],
    },
    {
      title: 'Account Upgrades',
      key: 'account',
      icon: 'fe fe-hard-drive',
      children: [
        {
          title: 'Professional Features',
          key: 'dashboard',
          url: '/dashboard/alpha',
        },
        {
          title: 'Membership Levels',
          key: 'dashboardGamma',
          url: '/dashboard/gamma',
        },
      ],
    },
    {
      title: 'Profile',
      key: 'ecommerce',
      icon: 'fe fe-users',
      children: [
        {
          title: 'Details and Settings',
          key: 'ecommerceDashboard',
          url: '/ecommerce/dashboard',
        },
        {
          title: 'Logout',
          key: 'ecommerceOrders',
          url: '/ecommerce/orders',
        },
      ],
    },
  ]
}
