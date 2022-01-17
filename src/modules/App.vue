<template>
  <div v-if="!isMobile">desktop asdf</div>
  <div v-if="isMobile">
    <div
      v-if="isAuthenticated"
      class="flex h-14 flex-row bg-primaryblue border-blue-400 border-b"
    >
      <div
        class="
          pl-4
          text-white
          flex
          justify-center
          text-start
          flex-col flex-grow
        "
      >
        <router-link to="/feedbacks"> PISTACHOS SHOP</router-link>
      </div>
      <router-link to="/telegram" class="flex justify-center flex-col px-4">
        <font-awesome-icon class="icon text-white" icon="paper-plane" />
      </router-link>
      <button @click="handleSignout" class="flex justify-center flex-col px-4">
        <font-awesome-icon class="icon text-white" icon="sign-out-alt" />
      </button>
    </div>
    <div
      v-if="isAuthenticated"
      class="flex flex-row bg-gray-100 border-b border-t border-gray-200"
    >
      <router-link
        class="flex flex-row flex-grow py-2 uppercase justify-center"
        v-bind:class="
          this.$route.name == 'Feedbacks'
            ? 'text-gray-700'
            : 'bg-gray-200 text-gray-400'
        "
        to="/feedbacks"
      >
        Отзывы
      </router-link>
      <router-link
        class="flex flex-row flex-grow py-2 uppercase justify-center"
        v-bind:class="
          this.$route.name == 'Coupons'
            ? 'text-gray-700'
            : 'bg-gray-200 text-gray-400'
        "
        to="/coupons"
      >
        Купоны
      </router-link>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive include="mobile-view-feedback-index">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { isMobile } from "../helpers/agent";

export default {
  name: "App",
  data() {
    return {
      isMobile: isMobile(),
    };
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
      isAuthenticated: (state) => state.isAuthenticated,
    }),
  },
  methods: {
    ...mapActions("auth", {
      signout: "signout",
    }),
    handleSignout() {
      localStorage.removeItem("fullPath");
      this.signout();
      this.$cookies.remove("auth-token");
      this.$router.push("/");
    },
  },
};
</script>
