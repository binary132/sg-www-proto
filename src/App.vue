<template>
  <div id="app">

    <backend-test
     backend="/v1"
     :port-number="8080">
    </backend-test>

  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import backendTest from './components/backendTest'

export default {
  name: 'app',
  components: {
    backendTest
  },
  data: {
    source: {},
    user: {
      name: 'Kevin Weber',
      id: '001',
      joinedDate: '2016/08/22',
      teams: [
        'Synapse Garden',
        'Blue Visual',
        'Bayfront',
        'SideTrip'
      ],
      projects: [
        'Vue Learning',
        'Kyber',
        'Dwarf Game',
        'Mote',
        'Phoenix Engine',
        'i',
        'Transit VR'
      ],
      dataSets: [
        {
          name: 'Null Set',
          id: '000',
          type: 'null',
          data: []
        },
        {
          name: 'Powers of 2',
          id: '001',
          type: 'numbers',
          data: [
            1, 2, 4, 8, 16, 32
          ]
        },
        {
          name: 'Primes',
          id: '002',
          type: 'numbers',
          data: [
            2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71
          ]
        },
        {
          name: 'Associates',
          id: '003',
          type: 'strings',
          data: [
            'HelloVue', 'Kevin', 'Bodie', 'Lem E. Skrumpit'
          ]
        },
        // {
        //   name: 'Projects',
        //   id: '004',
        //   type: 'reference',
        //   path: 'user/projects'
        // }
        {
          name: 'SG Ideation Stream',
          id: '005',
          type: 'messages',
          data: [
            {
              user: 'Kevin Weber',
              text: 'Sup skrumple butt'
            },
            {
              user: 'Kevin Weber',
              text: 'How was work today?'
            },
            {
              user: 'Bodie Solomon',
              text: 'Pretty grumpin\' grood lol'
            },
            {
              user: 'Bodie Solomon',
              text: 'Train ride home was boring af though -_-'
            },
            {
              user: 'Kevin Weber',
              text: 'o cool glad 2 hear'
            },
            {
              user: 'Kevin Weber',
              text: 'I\'m working on chat component now, should be p grood'
            },
            {
              user: 'Kevin Weber',
              text: 'Hopefully I can keep a lot of this code for re-use or at least conceptually take a lot from it so I wasn\'t wasting my time this whole time'
            },
            {
              user: 'Bodie Solomon',
              text: 'Yeah I hate wasting time/effort too :\\'
            },
            {
              user: 'Bodie Solomon',
              text: 'Hey isn\'t this the SG Ideation Stream? This isn\'t very productive lol'
            },
            {
              user: 'Kevin Weber',
              text: 'I know, sigh'
            },
            {
              user: 'Kevin Weber',
              text: 'talk about a frumpin\' grump flumper'
            }
          ]
        }
      ]
    },
    dashboard: [],
    build: {
      build: 'dev',
      version: 'v0.0.1',
      passing: 'passing'
    }
  }
}
</script>

<style>
#app{
  width: 500px;
  margin: auto;
}
</style>
