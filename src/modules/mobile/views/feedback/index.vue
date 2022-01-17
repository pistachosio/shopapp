<template>
  <loading v-model:active="isLoading" blur="" :is-full-page="true" />
  <div class="page" v-if="!isLoading">
    
    <div class="">
      <router-link
        v-for="(feedback, i) in feedbacks"
        :to="`/feedbacks/${feedback.id}`"
        :key="i"
        class="flex flex-col pb-2 mb-2 text-15"
        v-bind:class="
          !feedback.isParent
            ? 'border-gray-100 border border-l-0 border-r-0 border-t-0'
            : ''
        "
      >
        <div v-bind:class="feedback.guestId == 0 ? 'pl-7' : ''">
          <div class="flex-row flex justify-between">
            <div
              class="flex font-bold text-sm pr-2 items-center"
              v-bind:class="
                feedback.viewedAt > 0 ? 'text-gray-600' : 'text-red-500'
              "
            >
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

          <div
            class="pt-1"
            v-bind:class="
              feedback.viewedAt > 0 ? 'text-gray-400' : 'text-gray-600'
            "
          >
            {{ feedback.message }}
          </div>
        </div>
      </router-link>
    </div>
    <br />
    <el-button
      v-if="!isLoadingMore && showLoadMoreButton"
      @click="loadMoreFeedbacks"
      type="default"
      plain
      class="w-full text-sd text-gray-400 uppercase p-0 items-center pt-px h-10"
    >
      Показать еще
    </el-button>
    <div
      v-if="isLoadingMore"
      class="flex h-10 justify-center items-center text-gray-500"
    >
      <font-awesome-icon
        class="icon text-gray-400 rotate"
        icon="circle-notch"
        :transform="{ size: 24 }"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "mobile-view-feedback-index",
  data() {
    return {
      isLoadingMore: false,
      showLoadMoreButton: false,
    };
  },
  computed: {
    ...mapState("feedback", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
      feedbacks: (state) => state.feedbacks,
      page: (state) => state.page,
    }),
  },
  methods: {
    ...mapActions("feedback", {
      getFeedbacks: "getFeedbacks",
      getMoreFeedbacks: "getMoreFeedbacks",
    }),
    loadMoreFeedbacks() {
      this.isLoadingMore = true;
      this.getMoreFeedbacks({
        page: this.page + 1,
      }).then(() => {
        this.isLoadingMore = false;
      });
    },
  },
  created() {
    this.getFeedbacks({
      page: 1,
    }).then((data) => {
      if (data.isOK) {
        this.showLoadMoreButton = data.pages * data.perPage < data.total;
      }
    });
  },
};
</script>