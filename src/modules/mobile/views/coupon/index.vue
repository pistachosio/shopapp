<template>
  <loading v-model:active="isLoading" blur="" :is-full-page="true" />
  <div class="page" v-if="!isLoading">
    <div
      class="text-red-500 text-center bg-red-100 py-1 rounded mb-3"
      v-if="error"
    >
      <div>{{ error }}</div>
    </div>

    <template v-for="(coupon, i) in coupons" :key="i">
      <div
        v-if="
          this.$route.params.id == undefined ||
          this.$route.params.id == coupon.id
        "
      >
        <div class="flex flex-row">
          <div class="flex mr-4 w-20" style="min-width: 80px">
            <img
              class="w-20 h-20 rounded-xl"
              v-bind:src="`${coupon.dishImg}`"
            />
          </div>
          <div class="flex flex-col flex-grow">
            <div class="text-gray-400 text-sm leading-4">Гость</div>
            <div class="text-gray-700 font-bold">@{{ coupon.guestLogin }}</div>
            <div class="h-1" />
            <div class="text-gray-400 text-sm leading-4">Еда</div>
            <div class="text-gray-500 leading-6">
              {{ coupon.dishName }}
            </div>
            <div class="h-1" />
            <div class="text-gray-400 text-sm leading-4">Заведение</div>
            <div class="text-gray-500">
              {{ coupon.shopName }}
            </div>
          </div>
        </div>
        <div class="h-2" />
        <div
          v-if="coupon.confirmedAt > 0"
          class="
            w-full
            text-base
            uppercase
            text-center
            bg-gray-200
            py-2
            rounded
            pt-2.5
            text-gray-500
          "
        >
          Подтвержден
        </div>
        <el-button
          v-if="coupon.confirmedAt == 0"
          @click="handleConfirmCoupon(coupon)"
          class="w-full text-base uppercase p-0"
          type="success"
        >
          Подтвердить
        </el-button>
        <div class="h-4 mt-2 border-t border-gray-100" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "mobile-view-coupon-index",
  data() {
    return {};
  },
  computed: {
    ...mapState("coupon", {
      isLoading: (state) => state.isLoading,
      coupons: (state) => state.coupons,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions("coupon", {
      getCoupons: "getCoupons",
      confirmCoupon: "confirmCoupon",
    }),
    handleConfirmCoupon(coupon) {
      this.confirmCoupon(coupon.id);
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>