import Signin from '../modules/mobile/views/signin';
import FeedbackIndex from '../modules/mobile/views/feedback/index.vue';
import FeedbackShow from '../modules/mobile/views/feedback/show.vue';

export default [{
    path: '/',
    name: 'Signin',
    component: Signin,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: FeedbackIndex,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/feedbacks/:id',
    name: 'Feedback',
    component: FeedbackShow,
    meta: {
      requiresAuth: true,
    },
  },
];