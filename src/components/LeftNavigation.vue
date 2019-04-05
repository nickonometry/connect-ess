<template>
    <div>
        <v-toolbar flat v-if="leftNavHeader">
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="subtitle">
                        Left Sidebar Header
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider v-if="leftNavHeader"></v-divider>
    
        <v-container pa-2 mt-0>
            <v-list class="pt-0">
                <v-list-tile v-for="item in navItems" :key="item.title" :to="item.route">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
    
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
            leftNavHeader: false,
            navItems: [{
                    title: 'ESS Home',
                    icon: 'home',
                    route: '/'
                },
                {
                    title: 'Benefits Enrollment',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Time Entry',
                    icon: '',
                    route: '/time-entry',
                },
                {
                    title: 'Pay/Tax',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Personal Information',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Training',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Performance Management',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Task List',
                    icon: '',
                    route: '/#',
                },
                {
                    title: 'Career Planning',
                    icon: '',
                    route: '/#',
                },
            ],
        }),
    }
</script>

<style>
    
</style>
