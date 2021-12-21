<template>
  <loading v-model:active="isLoading" blur="" :is-full-page="true" />
  <div class="page" v-if="!isLoading">
    <template v-for="(freedishCampaign, i) in freedishCampaigns" :key="i">
      <div class="flex flex-row">
        <div class="flex mr-4 w-20" style="min-width: 80px">
          <img
            class="w-20 h-20 rounded-xl"
            v-bind:src="`${freedishCampaign.dishImg}`"
          />
        </div>
        <div class="flex flex-col flex-grow">
          <div class="text-gray-400 text-sm leading-4">Гость</div>
          <div class="text-gray-700 font-bold">
            @{{ freedishCampaign.guestLogin }}
          </div>
          <div class="h-1" />
          <div class="text-gray-400 text-sm leading-4">Еда</div>
          <div class="text-gray-500 leading-6">
            {{ freedishCampaign.dishName }}
          </div>
          <div class="h-1" />
          <div class="text-gray-400 text-sm leading-4">Заведение</div>
          <div class="text-gray-500">
            {{ freedishCampaign.shopName }}
          </div>
          <template v-if="freedishCampaign.comment != ''">
            <div class="h-2" />
            <div class="text-gray-400 text-sm leading-4">Коментария</div>
            <div class="text-gray-500">
              {{ freedishCampaign.comment }}
            </div>
          </template>
        </div>
      </div>
      <div class="h-2" />
      <div
        v-if="freedishCampaign.paidAt == 0"
        class="
          flex
          w-full
          bg-gray-100
          justify-center
          py-2
          text-gray-500
          rounded
        "
      >
        Ждет оплату
      </div>

      <el-button
        v-if="freedishCampaign.paidAt > 0"
        @click="handleConfirmFreedishCampaign(freedishCampaign)"
        class="w-full text-base uppercase p-0"
        type="success"
      >
        Подтвердить
      </el-button>
      <div class="h-4 mt-2 border-t border-gray-100" />
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
    ...mapState("freedishCampaign", {
      isLoading: (state) => state.isLoading,
      freedishCampaigns: (state) => state.freedishCampaigns,
    }),
  },
  methods: {
    ...mapActions("freedishCampaign", {
      getActivatedFreedishCampaigns: "getActivatedFreedishCampaigns",
      confirmFreedishCampaign: "confirmFreedishCampaign",
    }),
    handleConfirmFreedishCampaign(freedishCampaign) {
      this.confirmFreedishCampaign({
        shopId: freedishCampaign.shopId,
        freedishCampaignId: freedishCampaign.freedishCampaignId,
        freedishCampaignGuestId: freedishCampaign.freedishCampaignGuestId,
      });
    },
  },
  created() {
    this.getActivatedFreedishCampaigns();
  },
};
</script>