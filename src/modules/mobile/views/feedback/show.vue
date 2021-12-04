<template>
  <loading v-model:active="isLoading" blur="" :is-full-page="true" />

  <div class="px-3" v-if="!isLoading">
    <div v-if="feedback.id != undefined">
      <div class="py-2 text-gray-500 uppercase">Отзыв</div>
      <div v-bind:class="feedback.guestId == 0 ? 'pl-7' : ''">
        <div class="flex-row flex justify-between">
          <div class="flex font-bold text-sm pr-2 items-center text-gray-600">
            {{ "@" + feedback.guestLogin }}
          </div>
          <div class="flex items-center text-gray-500 text-sm">
            {{ formatDate(feedback.createdAt) }}
          </div>
          <div class="flex flex-grow justify-end">
            <template v-for="i in [1, 2, 3, 4, 5]" :key="i">
              <font-awesome-icon
                class="icon"
                v-bind:class="
                  i <= feedback.rate ? 'text-yellow-600' : 'text-gray-300'
                "
                icon="star"
                :transform="{ size: 13.5 }"
              />
            </template>
          </div>
        </div>
        <span class="text-sm items-center text-green-600">
            {{ feedback.shopName }}
          </span>
        <div class="pt-1 text-gray-500">
          {{ feedback.message }}
        </div>
      </div>
    </div>
    <br class="mt-4" />
    <div>
      <el-input
        v-model="message"
        :autosize="{ minRows: 12, maxRows: 12 }"
        type="textarea"
        placeholder="ОТВЕТ"
      />
    </div>
    <br />
    <div
      v-if="success && !isLoading"
      class="flex justify-center text-green-600 uppercase"
    >
      Ответ принят
    </div>
    <br class="mt-2" />
    <div>
      <el-button
        @click="handleStoreFeedback"
        type="primary"
        class="w-full text-base uppercase p-0 items-center pt-px h-12"
      >
        Ответить
      </el-button>
    </div>

    <div class="mt-1 flex justify-center pt-2 text-primaryblue">
      <router-link to="/feedbacks">На главную</router-link>
    </div>
    <br class="mt-2" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "mobile-view-feedback-show",
  data() {
    return {
      message: "",
      success: false,
    };
  },
  computed: {
    ...mapState("feedback", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
      feedback: (state) => state.feedback,
      childFeedback: (state) => state.childFeedback,
    }),
  },
  methods: {
    ...mapActions("feedback", {
      getFeedback: "getFeedback",
      storeFeedback: "storeFeedback",
    }),
    handleStoreFeedback() {
      if (this.message == "") {
        return;
      }
      this.storeFeedback({
        message: this.message,
        parentId: parseInt(this.$route.params.id),
        shopId: this.feedback.shopId,
      }).then((data) => {
        this.success = data.isOK == true;
      });
    },
  },
  created() {
    this.getFeedback(this.$route.params.id).then((data) => {
      if (data.isOK) {
        this.message = data.childFeedback.message;
      }
    });
  },
};
</script>