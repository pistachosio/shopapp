import Signin from '../modules/mobile/views/signin';
import FeedbackIndex from '../modules/mobile/views/feedback/index.vue';
import FeedbackShow from '../modules/mobile/views/feedback/show.vue';
import CouponIndex from '../modules/mobile/views/coupon/index.vue';
import TelegramIndex from '../modules/mobile/views/telegram/index.vue';

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
  {
    path: '/coupons',
    name: 'Coupons',
    component: CouponIndex,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/coupons/:id',
    name: 'Coupon',
    component: CouponIndex,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/telegram',
    name: 'Telegram',
    component: TelegramIndex,
    meta: {
      requiresAuth: true,
    },
  },

];