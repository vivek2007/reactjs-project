export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Dashboards',
    },
    {
      title: 'Dashboards',
      key: 'dashboards',
      icon: 'fe fe-home',
      // roles: ['admin'], // set user roles with access to this route
      count: false,
      children: [
        {
          title: 'New Campaign',
          key: 'dashboard',
          url: '/dashboard/alpha',
        },
        {
          title: 'Professional Features',
          key: 'dashboardBeta',
          url: '/dashboard/beta',
        },
        {
          title: 'Memebership Levels',
          key: 'dashboardGamma',
          url: '/dashboard/gamma',
        },
      ],
    },
    {
      title: 'Compensation Plan',
      key: 'apps',
      icon: 'fe fe-database',
      children: [
        {
          title: 'Referrals and Earnings',
          key: 'appsProfile',
          url: '/apps/profile',
        },
      ],
    },
    {
      title: 'Orders',
      key: 'orders',
      icon: 'fe fe-shopping-cart',
      children: [
        {
          title: 'Order Clicks',
          key: 'ordersClicks',
          url: '/order/order-form',
        },
        {
          title: 'Order History',
          key: 'orderHistory',
          url: '/order/order-history',
        },
      ],
    },
    {
      title: 'Blogs & Discussions',
      key: 'blogs',
      icon: 'fe fe-discussion',
      children: [
        {
          title: 'Create a Post',
          key: 'blogsPost',
          url: '/blog/add-post',
        },
        {
          title: 'Posts List',
          key: 'blogsPostsList',
          url: '/blog/posts-list',
        },
      ],
    },
    {
      title: 'Compaign',
      key: 'extraApps',
      icon: 'fe fe-hard-drive',
      children: [
        {
          title: 'Calendar Scheduling',
          key: 'extraAppsGithubExplore',
          url: '/apps/github-explore',
        },
        {
          title: 'Order History',
          key: 'extraAppsGithubDiscuss',
          url: '/apps/github-discuss',
        },
        {
          title: 'Statistics',
          key: 'extraAppsDigitaloceanDroplets',
          url: '/apps/digitalocean-droplets',
        },
      ],
    },
    {
      title: 'Account Details',
      key: 'ecommerce',
      icon: 'fe fe-shopping-cart',
      children: [
        {
          title: 'My Profile',
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
