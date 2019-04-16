<template>
  <div>
      <v-container pa-2> 
    <v-layout align-space-around justify-space-between row>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0 text-xs-left"></v-card-text>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0 text-xs-left">
          <v-select
            :items="position"
            v-model="positionSelected"
            single-line
            label="Position"
            class="pa-0 mr-3"
          ></v-select>
        </v-card-text>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0 text-xs-left">
          <v-select
            :items="payType"
            v-model="payTypeSelected"
            single-line
            label="Pay Type"
            class="pa-0 mr-3"
          ></v-select>
        </v-card-text>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0 text-xs-left">
          <v-text-field
            single-line
            v-model="hours"
            v-on:input="updateTotalHours(currentIndex)"
            type="number"
            class="pa-0 mr-3"
            label="Hours"
          ></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0">
          <div
            style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left;"
          >
            <!-- <v-btn v-if="!duplicated" outline color="indigo" v-on:click="duplicated = !duplicated;">Add Time</v-btn> -->
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-card-text class="pa-0">
          <v-btn
            outline
            color="indigo"
            v-on:click="removeMeFromParent(currentIndex);"
          >Remove</v-btn>
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
    }
  },
  data: () => ({
    position: ["Cafeteria", "Crossing Guard"],
    positionSelected: "Cafeteria",
    positionSelectedDuplicated: "Cafeteria",
    payType: ["Regular", "Overtime"],
    payTypeSelected: "Regular",
    payTypeSelectedDuplicated: "Regular",
    hours: null,
    hoursDuplicated: null,
    dateSelected: null,
    duplicatedRows: [],
    duplicated: false,
    firstDate: true,
    itemsCount: 0,
    duplicatedItems: []
  }),

  mounted: function() {
      console.log("current index is " + this.currentIndex);
  },
  methods: {
    updateTotalHours(lineId) {
      this.$eventBus.$emit("HoursUpdatedGC", {
        hours: this.hours,
        index: lineId
      });
    },
    removeMeFromParent(lineId) {
        this.$eventBus.$emit("RemoveMyChild", {index: lineId, hours: this.hours});
    },
  }
};
</script>