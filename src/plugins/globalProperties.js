"use strict";
import moment from 'moment';

export default {
  install(app) {
    app.config.globalProperties.formatDate = (date) => {
      return moment(date * 1000).format('DD/MM/YY');
    },
    app.config.globalProperties.formatDateTime = (date) => {
      return moment(date * 1000).format('DD/MM/YY, H:mm');
    }
  }
}