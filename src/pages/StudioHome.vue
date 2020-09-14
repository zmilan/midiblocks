<template lang="pug">
q-page.full-height
  Workspace(ref='workspace' :options='options' :toolbox='toolbox' :blocks='[]' @change='workspaceEventHandler')
    //- category(name='MIDI Events' colour='#9fa55b')
    //-   block(type='midi_on_event')
    //- category(name='MIDI Arguments' colour='#a5935b')
    //-   block(type='midi_arg_compare_note')
    //- category.block-category-send-midi(name='Send MIDI' colour='#5ba5a5')
    //-   block(type='midi_send_note')
    //- sep
    //- category(name='Logic' colour='#5b80a5')
    //-   block(type='controls_if')
    //-   block(type='logic_compare')
    //-     field(name='OP') EQ
    //-   block(type='logic_operation')
    //-     field(name='OP') AND
    //-   block(type='logic_negate')
    //-   block(type='logic_boolean')
    //-     field(name='BOOL') TRUE
    //-   block(type='logic_null')
    //-   block(type='logic_ternary')
    //- category(name='Loops' colour='#5ba55b')
    //-   block(type='controls_repeat_ext')
    //-     value(name='TIMES')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 10
    //-   block(type='controls_whileUntil')
    //-     field(name='MODE') WHILE
    //-   block(type='controls_for')
    //-     field(name='VAR' id='+x@[E{uUuMC(G!%lB~vF') i
    //-     value(name='FROM')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-     value(name='TO')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 10
    //-     value(name='BY')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-   block(type='controls_forEach')
    //-     field(name='VAR' id='E`D{pL/f#h?~8#[VL5rC') j
    //-   block(type='controls_flow_statements')
    //-     field(name='FLOW') BREAK
    //- category(name='Math' colour='#5b67a5')
    //-   block(type='math_number')
    //-     field(name='NUM') 0
    //-   block(type='math_arithmetic')
    //-     field(name='OP') ADD
    //-     value(name='A')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-     value(name='B')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-   block(type='math_single')
    //-     field(name='OP') ROOT
    //-     value(name='NUM')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 9
    //-   block(type='math_trig')
    //-     field(name='OP') SIN
    //-     value(name='NUM')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 45
    //-   block(type='math_constant')
    //-     field(name='CONSTANT') PI
    //-   block(type='math_number_property')
    //-     mutation(divisor_input='false')
    //-     field(name='PROPERTY') EVEN
    //-     value(name='NUMBER_TO_CHECK')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 0
    //-   block(type='math_round')
    //-     field(name='OP') ROUND
    //-     value(name='NUM')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 3.1
    //-   block(type='math_on_list')
    //-     mutation(op='SUM')
    //-     field(name='OP') SUM
    //-   block(type='math_modulo')
    //-     value(name='DIVIDEND')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 64
    //-     value(name='DIVISOR')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 10
    //-   block(type='math_constrain')
    //-     value(name='VALUE')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 50
    //-     value(name='LOW')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-     value(name='HIGH')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 100
    //-   block(type='math_random_int')
    //-     value(name='FROM')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 1
    //-     value(name='TO')
    //-       shadow(type='math_number')
    //-         field(name='NUM') 100
    //-   block(type='math_random_float')
    //- //- category(name='Text' colour='#5ba58c')
    //- //-   block(type='text')
    //- //-     field(name='TEXT')
    //- //-   block(type='text_join')
    //- //-     mutation(items='2')
    //- //-   block(type='text_append')
    //- //-     field(name='VAR' id='AHM@IhCozpbm(mnOWJdU') item
    //- //-     value(name='TEXT')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT')
    //- //-   block(type='text_length')
    //- //-     value(name='VALUE')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //-   block(type='text_isEmpty')
    //- //-     value(name='VALUE')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT')
    //- //-   block(type='text_indexOf')
    //- //-     field(name='END') FIRST
    //- //-     value(name='VALUE')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='IKPMutPmnS`RhpSFFD-*') text
    //- //-     value(name='FIND')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //-   block(type='text_charAt')
    //- //-     mutation(at='true')
    //- //-     field(name='WHERE') FROM_START
    //- //-     value(name='VALUE')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='IKPMutPmnS`RhpSFFD-*') text
    //- //-   block(type='text_getSubstring')
    //- //-     mutation(at1='true' at2='true')
    //- //-     field(name='WHERE1') FROM_START
    //- //-     field(name='WHERE2') FROM_START
    //- //-     value(name='STRING')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='IKPMutPmnS`RhpSFFD-*') text
    //- //-   block(type='text_changeCase')
    //- //-     field(name='CASE') UPPERCASE
    //- //-     value(name='TEXT')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //-   block(type='text_trim')
    //- //-     field(name='MODE') BOTH
    //- //-     value(name='TEXT')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //-   block(type='text_print')
    //- //-     value(name='TEXT')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //-   block(type='text_prompt_ext')
    //- //-     mutation(type='TEXT')
    //- //-     field(name='TYPE') TEXT
    //- //-     value(name='TEXT')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') abc
    //- //- category(name='Lists' colour='#745ba5')
    //- //-   block(type='lists_create_with')
    //- //-     mutation(items='0')
    //- //-   block(type='lists_create_with')
    //- //-     mutation(items='3')
    //- //-   block(type='lists_repeat')
    //- //-     value(name='NUM')
    //- //-       shadow(type='math_number')
    //- //-         field(name='NUM') 5
    //- //-   block(type='lists_length')
    //- //-   block(type='lists_isEmpty')
    //- //-   block(type='lists_indexOf')
    //- //-     field(name='END') FIRST
    //- //-     value(name='VALUE')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='FCjet]zykpk;L@@J9Ht,') list
    //- //-   block(type='lists_getIndex')
    //- //-     mutation(statement='false' at='true')
    //- //-     field(name='MODE') GET
    //- //-     field(name='WHERE') FROM_START
    //- //-     value(name='VALUE')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='FCjet]zykpk;L@@J9Ht,') list
    //- //-   block(type='lists_setIndex')
    //- //-     mutation(at='true')
    //- //-     field(name='MODE') SET
    //- //-     field(name='WHERE') FROM_START
    //- //-     value(name='LIST')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='FCjet]zykpk;L@@J9Ht,') list
    //- //-   block(type='lists_getSublist')
    //- //-     mutation(at1='true' at2='true')
    //- //-     field(name='WHERE1') FROM_START
    //- //-     field(name='WHERE2') FROM_START
    //- //-     value(name='LIST')
    //- //-       block(type='variables_get')
    //- //-         field(name='VAR' id='FCjet]zykpk;L@@J9Ht,') list
    //- //-   block(type='lists_split')
    //- //-     mutation(mode='SPLIT')
    //- //-     field(name='MODE') SPLIT
    //- //-     value(name='DELIM')
    //- //-       shadow(type='text')
    //- //-         field(name='TEXT') ,
    //- //-   block(type='lists_sort')
    //- //-     field(name='TYPE') NUMERIC
    //- //-     field(name='DIRECTION') 1
    //- //- category(name='Color' colour='#a5745b')
    //- //-   block(type='colour_picker')
    //- //-     field(name='COLOUR') #ff0000
    //- //-   block(type='colour_random')
    //- //-   block(type='colour_rgb')
    //- //-     value(name='RED')
    //- //-       shadow(type='math_number')
    //- //-         field(name='NUM') 100
    //- //-     value(name='GREEN')
    //- //-       shadow(type='math_number')
    //- //-         field(name='NUM') 50
    //- //-     value(name='BLUE')
    //- //-       shadow(type='math_number')
    //- //-         field(name='NUM') 0
    //- //-   block(type='colour_blend')
    //- //-     value(name='COLOUR1')
    //- //-       shadow(type='colour_picker')
    //- //-         field(name='COLOUR') #ff0000
    //- //-     value(name='COLOUR2')
    //- //-       shadow(type='colour_picker')
    //- //-         field(name='COLOUR') #3333ff
    //- //-     value(name='RATIO')
    //- //-       shadow(type='math_number')
    //- //-         field(name='NUM') 0.5
    //- sep
    //- category(name='Variables' colour='#a55b80' custom='VARIABLE')
    //- category(name='Functions' colour='#995ba5' custom='PROCEDURE')
</template>

<script>
import {throttle} from 'lodash'
import Workspace from '../components/Workspace'
import store from 'store'
import '../assets/blocks/midi-events'
import '../assets/blocks/midi-args'
import '../assets/blocks/midi-send'
import '../assets/blocks/prompt'
import webmidi from 'webmidi'
import Interpreter from 'js-interpreter'
import Blockly from 'blockly'
import toolbox from '../assets/toolboxes/studio'

export default {
  name: 'MainLayout',

  components: {
    Workspace
  },

  /**
   * Initialize WebMidi
   */
  mounted () {
    webmidi.enable((errors) => {
      const inputs = {}
      const outputs = {}
      
      this.errors.webmidi.enable = errors

      // Map array to object using device.id
      // @note Any new properties must be set below or Vue won't refresh/update
      webmidi.inputs.forEach(input => {
        inputs[input.id] = input
        input.led = false
        input.lastMessage = ''
        this.bindInput(input.id)
      })
      webmidi.outputs.forEach(output => {
        outputs[output.id] = output
      })
      
      this.$store.commit('set', ['devices', {
        inputs,
        outputs
      }])
    })

    // Load workspace
    const currentStudio = store.get('currentStudio', {})
    if (currentStudio.workspace) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(currentStudio.workspace),
        this.$refs.workspace.blockly
      )
    } else {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>'),
        this.$refs.workspace.blockly
      )
    }

    // Setup listeners
    this.$root.$on('interpreter.triggerEvent', this.triggerEvent)
    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
  },

  watch: {
    /**
     * Resize main splitter
     */
    splitter: throttle(function () {
      store.set('splitter', this.splitter)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }, 50, {leading: true, trailing: true})
  },
  
  data () {
    return {
      hasLoaded: false,
      
      errors: {
        webmidi: {
          enable: false
        }
      },
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {},
      toolbox,

      // Spliter width in pixels
      splitter: store.get('splitter') || window.innerWidth / 3
    }
  },

  methods: {
    /**
     * Handles Workspace events
     */
    workspaceEventHandler (ev) {
      switch (ev.type) {
        case Blockly.Events.FINISHED_LOADING:
          this.hasLoaded = true
        break
          
        case Blockly.Events.BLOCK_CREATE:
        case Blockly.Events.BLOCK_DELETE:
        case Blockly.Events.BLOCK_CHANGE:
        case Blockly.Events.BLOCK_MOVE:
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          this.$refs.workspace.run()
          this.hasLoaded && this.autosave()
        break;
      }
    },

    /**
     * Save states
     */
    autosave () {
      store.set('currentStudio', {
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      })
    },

    /**
     * Binds individiual inputs
     */
    bindInput (id) {
      const input = webmidi.getInputById(id)
      const events = [/*'midimessage',*/ 'activesensing', 'channelaftertouch', 'channelmode', 'clock', 'continue', 'controlchange', 'keyaftertouch', 'noteoff', 'noteon', 'nrpn', 'pitchbend', 'programchange', 'reset', 'songposition', 'songselect', 'start', 'stop', 'sysex', 'timecode', 'tuningrequest', 'unknownsystemmessage']

      events.forEach(eventName => {
        input.addListener(eventName, 'all', ev => {
          this.$root.$emit('interpreter.triggerEvent', eventName, ev)
        })
      })

      // Toggle the light indicator
      input.addListener('midimessage', 'all', e => {
        this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, true])
        setTimeout(() => {
          this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, false])
        }, 10)
      })
    },

    /**
     * Runs the code (if isPlaying)
     */
    triggerEvent (eventName, ev) {
      // Run the code
      if (this.code) {
        let data = Object.assign({}, ev)
        data.target = Object.assign({}, data.target)
        delete data.target._midiInput
        delete data.target._userHandlers
        delete data.target.lastMessage
        data = JSON.stringify(data)
        
        Interpreter.appendCode(`triggerEvent('${eventName}', '${data}')`)
        Interpreter.run()
      }

      // Update device message
      let midiName
      let midiData
      switch (eventName) {
        case 'noteon':
        case 'noteoff':
          midiName = `[${ev.note.number}, ${ev.note.name}, ${ev.note.octave}]`
          break;

        case 'controlchange':
          midiName = `[${ev.controller.number}, ${ev.controller.name}]`
          break;
      }
      
      this.$store.commit('set', [
        `devices.inputs['${ev.target.id}'].lastMessage`,
        `<div>
          <strong>${eventName}</strong>:
          <span>${midiName}</span>
        </div>
        <div>
          <strong>data</strong>:
          <span>[${ev.data[0]}, ${ev.data[1]}, ${ev.data[2]}]</span>
        </div>`])
    }
  }
}
</script>
