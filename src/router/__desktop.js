import Home from '../modules/desktop/views/home'

export default [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
];