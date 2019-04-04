<template>
  <v-app id="inspire">
    <OmnibarSideNavs></OmnibarSideNavs>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap>
          <v-flex>
          <div>
              <router-view></router-view>
          </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Tyler Technologies</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      drawerRight: null,
      right: false,
      left: false
    }),
  }
  </script>
