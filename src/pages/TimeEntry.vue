<template>
  <div class="about">
    <div style="margin-bottom: 24px;">
      <span class="headline" style="margin-bottom: 24px;">Time Entry</span>
    </div>
    <v-container grid-list-xl text-xs-center fluid pa-2>
      <v-layout row wrap>
        <v-flex xs3 pa-0>
          <v-select 
          :items="payPeriod" 
          v-model="value"
          label="Pay period" 
          outline
          value
          v-on:input="payPeriodSelection(value)"></v-select>
          <v-card>
            <v-date-picker
              color="primary"
              show-current
              full-width
              v-model="dates_selected"
              multiple
            ></v-date-picker>
          </v-card>
        </v-flex>

        <v-flex xs9 py-0>
          <v-card>
            <v-container pa-2>
              <v-layout align-center justify-center row>
                <v-flex xs2>
                  <v-card-text class="pa-0 text-xs-left">
                    <p class="pa-0 ma-0">Date</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-text class="pa-0 text-xs-left">
                    <p class="pa-0 ma-0">Position</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-text class="pa-0 text-xs-left">
                    <p class="pa-0 ma-0">Pay Type</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-text class="pa-0 text-xs-left">
                    <p class="pa-0 ma-0">Total Hours: {{totalSumOfHours}}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-text class="pa-0"></v-card-text>
                </v-flex>
                <v-flex xs2></v-flex>
              </v-layout>
            </v-container>

            <v-divider></v-divider>
              <div>
                <transition-group name="slide-fade">
                  <Query
                    v-for="(line, index) in dates_selected"
                    v-bind:key="line"
                    :currentIndex="index"
                    :currentDates="dates_selected"
                    ref="dateRows"
                  />
                </transition-group>
              </div>
          </v-card>
          <v-container fluid>
            <v-layout align-center justify-end row fill-height>
              <v-btn outline color="indigo">Cancel</v-btn>
              <v-btn color="primary">Submit</v-btn>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates_selected: [],
      payPeriod: ['April 1 - April 12', 'April 15 - April 26'],
      value: ['April 1 - April 12', 'April 15 - April 26'],
      totalNumberOfHours: [],
      totalNumberOfHoursGC: [],
      totalNumberOfDuplicatedHours: []
    };
  },
  methods: {
    payPeriodSelection(item) {
      if (item == "April 1 - April 12"){
        this.dates_selected.length = 0;
        this.dates_selected.push("2019-04-01","2019-04-02","2019-04-03","2019-04-04","2019-04-05","2019-04-08","2019-04-09","2019-04-10","2019-04-11","2019-04-12");
      } else {
        this.dates_selected.length = 0;
        this.dates_selected.push("2019-04-15","2019-04-16","2019-04-17","2019-04-18","2019-04-19","2019-04-22","2019-04-23","2019-04-24","2019-04-25","2019-04-26");
      }
    }
  },
  computed: {
    totalSumOfHours() {
      var sum = this.totalNumberOfHours.reduce((prev, curr) => prev + +curr, 0);
      var sumD = this.totalNumberOfDuplicatedHours.reduce(
        (prev, curr) => prev + +curr,
        0
      );

      var sumGC = this.totalNumberOfHoursGC.reduce((prev, curr) => prev + +curr, 0);
      return sum + sumD + sumGC;
    },
    sortDates() {
      var a = this.dates_selected.sort();
      return a;
    }
  },
  mounted: function() {
    this.$eventBus.$on("RemoveMe", data => {
      this.dates_selected.splice(data.index, 1);
      this.totalNumberOfHours.splice(data.index, 1);
    });

    this.$eventBus.$on("RemoveMeDuplicated", data => {
      if (typeof this.dates_selected[data.index] === "undefined") {
        this.totalNumberOfDuplicatedHours.splice(data.index, 1);
      } else {
        this.totalNumberOfDuplicatedHours.splice(data.index, 1, "0");
      }
    });

    this.$eventBus.$on("InitialHourAdd", data => {
      this.totalNumberOfHours.splice(data.index, 0, data.hours);
      this.totalNumberOfDuplicatedHours.splice(data.index, 0, data.hours);
    });

    this.$eventBus.$on("HoursUpdated", data => {
      this.totalNumberOfHours.splice(data.index, 1, data.hours);
    });

    this.$eventBus.$on("HoursUpdatedGC", data => {
      if (this.totalNumberOfHoursGC[data.index] != data.hours) {
        this.totalNumberOfHoursGC.splice(data.index, 1, data.hours);
      }
    });

    this.$eventBus.$on("RemoveMyChild", data => {
      this.totalNumberOfHoursGC.splice(data.index, 1);
    });

    this.$eventBus.$on("DuplicatedHoursUpdated", data => {
      this.totalNumberOfDuplicatedHours.splice(data.index, 1, data.hours);
    });
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