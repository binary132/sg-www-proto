<!-- META INFO -->
<!--
    Main input component
-->
<!--  -->

<!-- TEMPLATE -->
<template><div id="cmdbar">
  <input
    name='cmd'
    ng-trim='false'
    v-model='trueEntry'
    @keydown.enter='submitOnEnter()'>
  <div id="history">
    <ul>
      <li v-for='cmd in commandLog' class="history-item">
        {{ cmd }}
      </li>
    </ul>
  </div>
  <div id="composite-entry">
    <span id="painted-entry">&gt; {{ trueEntry }}</span><span id="cursor"></span><span id="ghost-entry">{{ ghostEntry }}</span>
  </div>
</div></template>



<!-- SCRIPT -->
<script>
export default {
  data () {
    return {
      trueEntry: '',
      commandLog: []
    }
  },

  computed: {
    ghostEntry: function () {
      let text = 'Start typing to construct a command'
      let length = this.trueEntry.length
      return text.slice(length)
    }
  },

  methods: {
    submitOnEnter: function () {
      if (this.trueEntry.length > 0) {
        this.commandLog.push(this.trueEntry)
        this.trueEntry = ''
      }
    }
  }
}
</script>



<!-- STYLE -->
<style scoped>
#cmdbar{
  position: fixed;
  width: 500px;
  height: 2em;
  bottom: 7em;
  left: calc(50% - 250px);
}
*{
  font-size: 1.0em;
  transition: all 150ms ease;
}

input{
  font-family: inherit;
  width: calc(100% - 3em);
  height: 100%;
  padding: 0em 1em 0em 2em;
  border-radius: 2em;
  box-shadow: 0px 1px 0px #807878 inset;
  background-color: #d6cac0;
  border: 2px solid #000;
  box-sizing: content-box;

  baseline: center;
}
input:focus{
  border: 2px solid #d64;
  outline: none;
  box-shadow: 0px 3px 1px #807878 inset;
  opacity: 1.0;
}

#composite-entry{
  background-color: #d6cac0;
  white-space: pre;
  font-family: 'Ubuntu Mono', monospace;
  position: absolute;
  top: 0.6em;
  left: 1em;
  pointer-events: none;
  width: 90%;
}
input:focus ~ #composite-entry{
}
#painted-entry{
}
#ghost-entry{
  opacity: 0.3;
}
#cursor::after{
  content: "|";
  position: relative;
  display: inline-block;
  width: 0;
  left: -0.25em;
  animation: blink 800ms infinite;
}
@keyframes blink{
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

#history{
  position: absolute;
  bottom: 1.5em;
  left: -1em;
  pointer-events: none;
  color: #a97;
}
.history-item{
  list-style: none;
  animation: historyFade 5000ms 1;
  animation-timing-function: ease-in;
  opacity: 0.0;
}
@keyframes historyFade{
  from { opacity: 1; display: visible; }
  to { opacity: 0; display: none; }
}

</style>
