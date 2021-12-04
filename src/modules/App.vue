<template>
  <div v-if="!isMobile">desktop asdf</div>
  <div v-if="isMobile">
    <div v-if="isAuthenticated" class="flex h-14 flex-row bg-primaryblue border border-gray-300 border-t-0 border-l-0 border-r-0">
      <div class="pl-4 text-white flex justify-center text-start flex-col flex-grow  ">
        <router-link to="/feedbacks" > PISTACHOS SHOP</router-link>
      </div>
      <button @click="handleSignout" class="flex justify-center flex-col px-4">
        <font-awesome-icon class="icon  text-white" icon="times" />
      </button>
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
      localStorage.removeItem('fullPath');
      this.signout();
      this.$cookies.remove("auth-token");
      this.$router.push('/');
    }
  },
};
</script>
