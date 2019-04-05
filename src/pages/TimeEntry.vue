<template>
  <div class="about">
    <div style="margin-bottom: 24px;"><span class="headline" style="margin-bottom: 24px;">Time Entry</span></div>
      <v-container grid-list-xl text-xs-center fluid pa-2>
        <v-layout row wrap>
          <v-flex xs3 pa-0>
            <v-card>
              <v-date-picker
                color="primary"
                show-current="false"
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
                    <v-card-text class="pa-0">

                    </v-card-text>
                  </v-flex>
                  <v-flex xs2>

                  </v-flex>
                </v-layout>
              </v-container>

              <v-divider></v-divider>
              <transition name="fade">
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
              </transition>
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
      totalNumberOfHours: [],
      totalNumberOfDuplicatedHours: [],
    };
  },
  methods: {

  },
  computed: {
    totalSumOfHours(){
      var sum = this.totalNumberOfHours.reduce((prev, curr) => prev + (+curr), 0);
      var sumD = this.totalNumberOfDuplicatedHours.reduce((prev, curr) => prev + (+curr), 0);
        // var sum = 0;
        // var i = 0;
        // for (i=0; i < this.totalNumberOfHours.length; i++) {
        //   sum += parseInt(this.totalNumberOfHours[i]);
        // }

        // var sumD = 0;
        // var d = 0;
        // for (d=0; d < this.totalNumberOfDuplicatedHours.length; d++) {
        //   sumD += parseInt(this.totalNumberOfDuplicatedHours[d]);
        // }
        return sum + sumD;
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
      console.log("She runnin bud");
      if (typeof this.dates_selected[data.index] === 'undefined') {
         this.totalNumberOfDuplicatedHours.splice(data.index, 1);
      } else {
         this.totalNumberOfDuplicatedHours.splice(data.index, 1, '0');
      }
    });

    this.$eventBus.$on("InitialHourAdd", data => {
      this.totalNumberOfHours.splice(data.index, 0, data.hours);
      this.totalNumberOfDuplicatedHours.splice(data.index, 0, data.hours);
    });

    this.$eventBus.$on("HoursUpdated", data => {
      console.log("Received event from child, hours updated!!!");
      this.totalNumberOfHours.splice(data.index, 1, data.hours);
    });

    this.$eventBus.$on("DuplicatedHoursUpdated", data => {
      console.log("Received event from child, DuplicatedHoursUpdated updated!!!");
      this.totalNumberOfDuplicatedHours.splice(data.index, 1, data.hours);
    });
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>