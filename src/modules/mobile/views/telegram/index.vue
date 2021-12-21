<template>
  <div class="page" v-if="!isLoading">
    <div class="h-2" />
    <div class="flex flex-row mx-2">
      <img class="flex w-12 h-12" src="https://telegram.org/img/t_logo.svg?1" />
      <div class="flex flex-grow flex-col ml-4">
        <div class="text-gray-700 mt-px">
          <a :href="`https://t.me/${feedbackBot}`" class="text-primaryblue">Pistachos Feedback</a>
        </div>
        <div class="text-gray-400 text-15">Бот для показа отзывов</div>
      </div>
    </div>
    <div class="h-8" />
    <div class="flex flex-row mx-2">
      <img class="flex w-12 h-12" src="https://telegram.org/img/t_logo.svg?1" />
      <div class="flex flex-grow flex-col ml-4">
        <div class="text-gray-700 mt-px">
          <a :href="`https://t.me/${orderBot}`" class="text-primaryblue">Pistachos Order</a>
        </div>
        <div class="text-gray-400 text-15">Бот для обработки заказов/купонов</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Telegram",
  data() {
    return {
      feedbackBot: process.env.NODE_ENV == 'development' ? 'pstfeedbackdev_bot' : process.env.VUE_APP_TELEGRAM_FEEDBACK_BOT,
      orderBot: process.env.NODE_ENV == 'development' ? 'pstorderdev_bot' : process.env.VUE_APP_TELEGRAM_ORDER_BOT, 
    };
  },
};
</script>