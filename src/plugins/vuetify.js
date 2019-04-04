import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.indigo.base, // #E53935
    secondary: colors.amber.base, // #FFCDD2
    accent: colors.green.base // #3F51B5
  }
})
