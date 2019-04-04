<template>
    <div>
        <!-- RIGHT NAV DRAWER -->
    
        <!-- LEFT NAV DRAWER -->
        <v-navigation-drawer v-model="drawer" fixed clipped app>
            <LeftNavigation></LeftNavigation>
        </v-navigation-drawer>
    
        <!-- OMNIBAR / MD-TOOLBAR-->
        <v-toolbar color="primary" dark fixed app clipped-right clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Employee Self Service</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat icon @click.stop="drawerRight = !drawerRight">
                <v-icon>help</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            drawerRight: null,
        }),
        mounted: function() {
    this.$eventBus.$on('toggle-right-sidenav', data => {
            this.drawerRight = !this.drawerRight;
        });
  },
        methods: {
        }
    }
</script>

<style>
    
</style>
