<template>
  <div>
    <div v-for="(date, index) in dates_selected" :key="date">
    <v-container pa-2>
      <v-layout align-space-around justify-space-between row>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0 text-xs-left">
            <p class="pa-0 ma-0">{{date}}</p>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0 text-xs-left">
            <v-select :items="position" single-line label="Position" class="pa-0 mr-3"></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0 text-xs-left">
            <v-select :items="payType" single-line label="Pay Type" class="pa-0 mr-3"></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0 text-xs-left">
            <v-text-field single-line v-bind="hours" class="pa-0 mr-3" label="Hours"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0">
            <div
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left;"
            >
              <div>
                <v-btn outline color="indigo" @click="removeLine(index)">Remove</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0">
            <div
              style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left;"
            >
              <div>
                <v-btn flat icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
    {{dates_selected}}
    </div>
</template>

<script>
export default {
  props: {
      dates_selected: {
        type: Array
      }
    },
  data() {
    return {
      position: ['Cafetaria', 'Front Desk'],
      payType: ['Regular', 'Overtime'],
      hours: null,
    };
  },
  methods: {
      removeLine(lineId) {
          this.dates_selected.splice(lineId, 1);        
      }

  }
};
</script>

<style>
</style>
