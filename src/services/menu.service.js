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
          key: 'dashboardGamma',
          url: '/apps/github-discuss',
        },
        {
          title: 'Statistics and Analytics',
          key: 'dashboardGamma',
          url: '/apps/digitalocean-droplets',
        },
        // {
        //   title: 'Professional Features',
        //   key: 'dashboard',
        //   url: '/dashboard/alpha',
        // },
        // {
        //   title: 'Membership Levels',
        //   key: 'dashboardGamma',
        //   url: '/dashboard/gamma',
        // },
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
      title: 'Latest Posts',
      key: 'orders',
      icon: 'fe fe-shopping-cart',
      children: [
        {
          title: 'Featured News',
          key: 'ordersClicks',
          url: '/dashboard/alpha',
        },
        {
          title: 'General Information',
          key: 'orderHistory',
          url: '/dashboard/alpha',
        },
        // {
        //   title: 'Order Clicks',
        //   key: 'ordersClicks',
        //   url: '/order/order-form',
        // },
        // {
        //   title: 'Order History',
        //   key: 'orderHistory',
        //   url: '/order/order-history',
        // },
      ],
    },
    {
      title: 'Account Upgrades',
      key: 'blogs',
      icon: 'fe fe-hard-drive',
      children: [
        {
          title: 'Professional Features',
          key: 'blogsPost',
          url: '/blog/add-post',
        },
        {
          title: 'Membership Levels',
          key: 'blogsPostsList',
          url: '/blog/posts-list',
        },
        // {
        //   title: 'Create a Post',
        //   key: 'blogsPost',
        //   url: '/blog/add-post',
        // },
        // {
        //   title: 'Posts List',
        //   key: 'blogsPostsList',
        //   url: '/blog/posts-list',
        // },
      ],
    },
    // {
    //   title: 'Campaign',
    //   key: 'extraApps',
    //   icon: 'fe fe-hard-drive',
    //   children: [
    //     {
    //       title: 'Calendar Scheduling',
    //       key: 'extraAppsGithubExplore',
    //       url: '/apps/github-explore',
    //     },
    //     {
    //       title: 'Order History',
    //       key: 'extraAppsGithubDiscuss',
    //       url: '/apps/github-discuss',
    //     },
    //     {
    //       title: 'Statistics',
    //       key: 'extraAppsDigitaloceanDroplets',
    //       url: '/apps/digitalocean-droplets',
    //     },
    //   ],
    // },
    {
      title: 'Profile',
      key: 'ecommerce',
      icon: 'fe fe-shopping-cart',
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
