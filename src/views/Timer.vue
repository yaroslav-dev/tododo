<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <div class="session-type">break</div>
    <v-progress-circular class="prog mb-10" size="200" color="#e7dfd5" :value="circValue || (timeLeftInSession / workSessionDefault.value) * 100" rotate="-90">
      <div class="clock">
        {{ clock }}
      </div>
    </v-progress-circular>
    <div class="rel d-flex justify-space-around align-self-stretch">
      <v-fade-transition>
        <div v-if="!startTrigger" class="absolute-div d-flex justify-space-around align-self-stretch">
          <v-btn rounded depressed large color="#84a9ac" style="color: #204051;" @click="start" title="start"><v-icon>mdi-play</v-icon></v-btn>
        </div>
      </v-fade-transition>
      <v-fade-transition>
        <div v-if="pauseTrigger" class="absolute-div d-flex justify-space-around align-self-stretch">
          <v-btn rounded depressed large color="#84a9ac" style="color: #204051;" @click="pause" title="pause"><v-icon>mdi-pause</v-icon></v-btn>
        </div>
      </v-fade-transition>
      <v-fade-transition>
        <div v-if="stopTrigger" class="absolute-div d-flex justify-space-around align-self-stretch">
          <v-btn class="mr-5" rounded depressed large color="#84a9ac" style="color: #204051;" @click="start" title="start"><v-icon>mdi-play</v-icon></v-btn>
          <v-btn rounded depressed large color="#84a9ac" style="color: #204051;" @click="stop" title="stop"><v-icon>mdi-stop</v-icon></v-btn>
        </div>
      </v-fade-transition>
    </div>
    <div class="mt-10 pt-10 d-flex justify-space-around">
      <v-btn rounded depressed large color="#84a9ac" style="color: #204051;" title="settings" @click="dialog = true"><v-icon>mdi-cog</v-icon></v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="600px" transition="slide-y-reverse-transition">
      <v-card color="#e7dfd5">
        <v-card-title style="color: #204051">
          <span class="headline">Set timer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="workSessionDefault"
                  :items="workSession"
                  @change="getValue()"
                  label="Work session"
                  suffix="min."
                  return-object
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['1', '2', '3', '4', '5', '10', '15']"
                  label="Short break"
                  suffix="min."
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['5', '10', '15', '20', '25', '30']"
                  label="Long break"
                  suffix="min."
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#3b6978" text>cancel</v-btn>
          <v-btn color="#3b6978" text>save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    computed: {
      clock() {
        return Math.floor(this.timeLeftInSession / 60) + ':' + ((Math.floor(this.timeLeftInSession % 60) < 10) ? '0' : '') + Math.floor(this.timeLeftInSession % 60)
      }
    },  
    data() {
      return {
        workSessionDefault: {
          text: '25',
          value: 1500
        },
        workSession: [
          {
            text: '25',
            value: 1500
          },
          {
            text: '30',
            value: 1800
          },
          {
            text: '45',
            value: 2700
          }
        ],
        sessionDuration: 1500,
        timeLeftInSession: null,
        interval: null,
        circValue: 0,
        startTrigger: false,
        pauseTrigger: false,
        stopTrigger: false,
        dialog: false
      }
    },
    created() {
      this.timeLeftInSession = this.workSessionDefault.value
    },
    methods: {
      getValue() {
        clearInterval(this.interval)
        this.timeLeftInSession = this.workSessionDefault.value
        this.circValue = 0
        this.startTrigger = false
        this.stopTrigger = false
        this.pauseTrigger = false
        console.log(this.timeLeftInSession)
      },
      start() {
        this.interval = setInterval(() => {
          if (!this.timeLeftInSession) {
            clearInterval(this.interval)
            this.timeLeftInSession = this.workSessionDefault.value
            this.circValue = 0
            this.startTrigger = false
            this.stopTrigger = false
            this.pauseTrigger = false
          } else {
            this.startTrigger = true
            this.pauseTrigger = true
            this.stopTrigger = false
            this.timeLeftInSession--
            this.circValue = (this.timeLeftInSession / this.workSessionDefault.value) * 100
          }
        }, 1000)
      },
      pause() {
        clearInterval(this.interval)
        this.stopTrigger = true
        this.pauseTrigger = false
      },
      stop() {
        clearInterval(this.interval)
        this.timeLeftInSession = this.workSessionDefault.value
        this.circValue = 0
        this.startTrigger = false
        this.stopTrigger = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .prog {
    transform: rotatey(180deg);
  }
  .session-type {
    color: #84a9ac;
    font-size: 1.2em;
    margin-top: -1.2em;
    margin-bottom: 1.2em;
    text-transform: lowercase;
  }
  .clock {
    font-size: 3em;
    color: #e7dfd5;
    transform: rotatey(-180deg);
  }
  .rel {
    position: relative;
  }
  .absolute-div {
    position: absolute;
  }
  .set-btn-div {
    position: absolute;
  }
</style>