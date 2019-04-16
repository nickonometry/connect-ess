import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import OmnibarSideNavs from "./components/OmnibarSideNavs";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";
import TimeEntryComponent from "./components/TimeEntryComponent";
import Query from "./components/Query";
import subQuery from "./components/subQuery";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

Vue.component('OmnibarSideNavs', OmnibarSideNavs);
Vue.component('LeftNavigation', LeftNavigation);
Vue.component('RightNavigation', RightNavigation);
Vue.component('TimeEntryComponent', TimeEntryComponent);
Vue.component('Query', Query);
Vue.component('subQuery', subQuery);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
