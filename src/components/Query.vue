<template>
  <div>
      <v-container pa-2>
        <v-layout align-space-around justify-space-between row>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <p class="pa-0 ma-0">{{currentDates[currentIndex]}}</p>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-select :items="position" v-model="positionSelected" single-line label="Position" class="pa-0 mr-3"></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-select :items="payType" v-model="payTypeSelected" single-line label="Pay Type" class="pa-0 mr-3"></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-text-field single-line v-model="hours" v-on:input="updateTotalHours(currentIndex)" type="number" class="pa-0 mr-3" label="Hours"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0">
              <div
                style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left;"
              >
                  <v-btn v-if="!duplicated" outline color="indigo" v-on:click="duplicated = !duplicated;">Duplicate</v-btn>
              </div>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0">
                <v-btn outline color="indigo" v-on:click="updateParentPicker(currentIndex);">Remove</v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container pa-2 v-if="duplicated">
        <v-layout align-space-around justify-space-between row>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">

            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-select :items="position" v-model="positionSelectedDuplicated" single-line label="Position" class="pa-0 mr-3"></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-select :items="payType" v-model="payTypeSelectedDuplicated" single-line label="Pay Type" class="pa-0 mr-3"></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0 text-xs-left">
              <v-text-field single-line v-model="hoursDuplicated" v-on:input="updateTotalDuplicatedHours(currentIndex)" type="number" class="pa-0 mr-3" label="Hours"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0">
                
            </v-card-text>
          </v-flex>
          <v-flex xs2 align-self-center>
            <v-card-text class="pa-0">
                <v-btn v-on:click="duplicated = !duplicated; updateParentPickerDuplicated(currentIndex);" flat icon color="indigo">
              <v-icon>clear</v-icon>
            </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
export default {
    props: {
      currentIndex: {
        type: Number
      },
      currentDates: {
        type: Array
      },
      numberOfHours: {
        type: Object
      }
    },
  data() {
    return {
        position: ['Cafetaria', 'Crossing Guard'],
        positionSelected: 'Cafetaria',
        positionSelectedDuplicated: 'Cafetaria',
        payType: ['Regular', 'Overtime'],
        payTypeSelected: 'Regular',
        payTypeSelectedDuplicated: 'Regular',
        hours: null,
        hoursDuplicated: null,
        dateSelected: null,
        duplicatedRows: [],
        duplicated: false,
    };
  },
  mounted: function() {
      this.$eventBus.$emit("InitialHourAdd", {hours: '0', index: this.currentIndex});
      this.$eventBus.$emit("InitialDuplicatedHourAdd", {hours: '0', index: this.currentIndex});
  },
  methods: {
    updateParentPicker(lineId) {
        this.$eventBus.$emit("RemoveMe", {hours: this.hours, index: lineId});
        // this.destroy = !this.destroy;
    },
    updateParentPickerDuplicated(lineId) {
        this.$eventBus.$emit("RemoveMeDuplicated", {hours: this.hoursDuplicated, index: lineId});
        // this.destroy = !this.destroy;
    },
    updateTotalHours(lineId) {
        this.$eventBus.$emit("HoursUpdated", {hours: this.hours, index: lineId});
    },
    updateTotalDuplicatedHours(lineId) {
        this.$eventBus.$emit("DuplicatedHoursUpdated", {hours: this.hoursDuplicated, index: lineId});
    },
  },
};
</script>


<style lang="scss" scoped></style>