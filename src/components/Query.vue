<template>
  <div>
    <v-container pa-2>
      <v-layout align-space-around justify-space-between row>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0 text-xs-left">
            <p class="pa-0 ma-0">{{dateLabel}}</p>
          </v-card-text>
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
              <v-btn outline color="indigo" v-on:click="addTime(); setDuplication()">Add Time</v-btn>
            </div>
          </v-card-text>
        </v-flex>
        <v-flex xs2 align-self-center>
          <v-card-text class="pa-0">
            <v-btn
              outline
              color="indigo"
              v-on:click="updateParentPicker(currentIndex); updateParentPickerDuplicated(currentIndex);"
            >Remove</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- ADDED ENTRIES TO A SPECIFIC DAY -->
    <div v-if="duplicatedItems.length > 0">
    <transition-group name="slide-fade">
            <subQuery
              v-for="(line, index) in duplicatedItems"
              v-bind:key="line"
              :currentIndex="index"
              ref="dateSubRows"
            />
    </transition-group>
    </div>

    <v-divider></v-divider>
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
      dateLabel: this.currentDates[this.currentIndex],
      firstDate: true,
      itemsCount: 0,
      duplicatedItems: []
    };
  },
  mounted: function() {
    this.$eventBus.$emit("InitialHourAdd", {
      hours: "0",
      index: this.currentIndex
    });
    this.$eventBus.$emit("InitialDuplicatedHourAdd", {
      hours: "0",
      index: this.currentIndex
    });
    var d = this.currentDates[this.currentIndex];
    var day = d.substr(6, 6);
    var year = d.substr(0, 4);
    var replaceSlash = day.replace("-", "/");
    this.formattedDate = d;

    this.$eventBus.$on("RemoveMyChild", data => {
      this.duplicatedItems.splice(data.index, 1);
      //this.totalNumberOfHours.splice(data.index, 1);
      console.log("Remove my child!!!");
    });
  },
  methods: {
    updateParentPicker(lineId) {
      this.$eventBus.$emit("RemoveMe", { hours: this.hours, index: lineId });
    },
    updateParentPickerDuplicated(lineId) {
      this.$eventBus.$emit("RemoveMeDuplicated", {
        hours: this.hoursDuplicated,
        index: lineId
      });
    },
    updateTotalHours(lineId) {
      this.$eventBus.$emit("HoursUpdated", {
        hours: this.hours,
        index: lineId
      });
    },
    updateTotalDuplicatedHours(lineId) {
      this.$eventBus.$emit("DuplicatedHoursUpdated", {
        hours: this.hoursDuplicated,
        index: lineId
      });
    },
    addTime() {
      this.itemsCount++;
      this.duplicatedItems.push(this.itemsCount);
    },
    setDuplication() {
      this.duplicated = true;
    }
  }
};
</script>


<style>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>