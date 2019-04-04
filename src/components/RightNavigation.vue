<template>
    <div>
        <v-toolbar flat v-if="rightNavHeader">
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="subtitle">
                        Right Sidebar Header
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-spacer></v-spacer>
            <v-btn flat icon @click.stop="toggleDrawer()">
                <v-icon>clear</v-icon>
            </v-btn>
        </v-toolbar>
    
        <v-divider></v-divider>
        <v-container>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quibusdam ducimus est at, obcaecati nesciunt culpa architecto perferendis accusamus consectetur. Non blanditiis nesciunt, dolorum maxime beatae esse veniam dolor!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quibusdam ducimus est at, obcaecati nesciunt culpa architecto perferendis accusamus consectetur. Non blanditiis nesciunt, dolorum maxime beatae esse veniam dolor!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum exercitationem quibusdam ducimus est at, obcaecati nesciunt culpa architecto perferendis accusamus consectetur. Non blanditiis nesciunt, dolorum maxime beatae esse veniam dolor!</p>
        </v-container>
    
    </div>
</template>

<script>
    export default {
        data: () => ({
            rightNavHeader: true,
        }),
        methods: {
            toggleDrawer() {
                this.$eventBus.$emit("toggle-right-sidenav", "Hello!");
            }
        }
    }
</script>

<style>
    
</style>
