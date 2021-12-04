<template>
  <loading v-model:active="isLoading" blur="" :is-full-page="true" />
  <div class="signin">
    <div class="signin-content">
      <h1 class="signin-content__item signin-content__item--title">
        PISTACHOS SHOP
      </h1>
      <div class="signin-content__item">
        <input
          type="number"
          v-model="phoneNumber"
          class="input"
          v-bind:class="showSmsCodeField ? 'top-input' : ''"
          placeholder="Номер телефона"
          required
          autofocus
        />
      </div>
      <div class="signin-content__item" v-if="showSmsCodeField">
        <input
          type="number"
          v-model="smsCode"
          class="input bottom-input"
          placeholder="СМС код"
          required
        />
      </div>
      <div class="signin-content__item signin-content__item--action">
        <el-button type="primary" v-on:click="onPress()">
          {{showSmsCodeField ? 'ВХОД' : 'ДАЛЕЕ'}}
        </el-button>
      </div>
      <div
        class="signin-content__item signin-content__item--alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <p class="signin-content__item signin-content__item--copyright">
        &copy; 2021 pistachos.io
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  name: "Signin",
  data() {
    return {
      phoneNumber: "",
      smsCode: "",
      showSmsCodeField: false,
    };
  },
  created() {
    var token = this.$cookies.get("auth-token");
    if (token != null) {
      this.setHeaderToken(token);
      this.me().then((data) => {
        if (data.isOK) {
          
          var fullPath = localStorage.getItem("fullPath");
 
          if (fullPath != null) {
        
            this.$router.push(fullPath);
          } else {
           
            this.$router.push("/feedbacks");
          }
        }
      });
    }
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions("auth", {
      signin: "signin",
      me: "me",
    }),
    onPress() {
      if (this.phoneNumber != "") {
        this.signin({
          phoneNumber: this.phoneNumber.toString(),
          smsCode: this.smsCode.toString(),
        }).then((data) => {
          if (data.isOK) {
            if (this.smsCode != "") {
              this.$cookies.set("auth-token", data.token);
              this.setHeaderToken(data.token);

              this.$router.push("/feedbacks");
            } else {
              this.showSmsCodeField = true;
            }
          }
        });
      }
    },
    setHeaderToken(token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    },
  },
};
</script>