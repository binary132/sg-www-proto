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
        <!-- <li v-for='(cmd, index) in commandLog' -->
        <li v-for="i in commandLog.length"
        :style="'opacity: ' + (1/(commandLog.length+1))*(i+1) + ';'">
          <div class="command-item">&gt; {{ commandLog[i-1] }}</div>
          <div class="reply-item">{{ replyLog[i-1] }} &lt;</div>
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
      rawCmd: '',
      cmdParam: [],
      commandLog: [],
      replyLog: [],
      trueEntry: '',
      print: ''
    }
  },

  computed: {
    ghostEntry: function () {
      let text = ''
      let length = this.trueEntry.length
      if (length === 0) {
        text = 'Start typing to construct a command'
      }
      return text.slice(length)
    }
  },

  methods: {
    submitOnEnter: function () {
      let commandEntry = this.trueEntry
      if (commandEntry.length > 0) {
        this.commandLog.push(commandEntry)
        if (this.commandLog.length > 5) {
          this.commandLog.shift()
        }

        this.trueEntry = ''

        this.parseCommand(commandEntry)
      }
    },

    parseCommand: function (fullCommand) {
      let cmdArray = fullCommand.split(' ')
      let cmd = cmdArray[0]
      let params = cmdArray.slice(1)

      switch (cmd) {
        case 'echo':
          this.print(params[0])
          break
        case 'clr':
        case 'clear':
          this.commandLog = []
          this.replyLog = []
          break
        default:
          this.print('Huh?')
      }
    },

    print: function (text) {
      this.replyLog.push(text)
      if (this.replyLog.length > 5) {
        this.replyLog.shift()
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
  border-radius: 2em;
  box-shadow: 0px 1px 0px #807878 inset;
  background-color: #d6cac0;
  border: 2px solid #000;
  padding-left: 2em;
  padding-right: 1em;

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
  left: 0em;
  pointer-events: none;
  color: #a97;
  width: 100%;
}
#history ul, #history ol{
  padding: 0em 0.5em;
}
#history li{
  list-style: none;
}
#history li div{
  padding: 0.05em 0.5em;
}
#history .reply-item{
  text-align: right;
  color: #9a7;
  background: rgba(0,0,0,0.1);
}

</style>
