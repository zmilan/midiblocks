/**
 * API for accessing localstorage similarly to how it's done with API
 */
export default {
  get: {
    /**
     * Boot data (menus etc)
     */
    boot () {
      return {
        mainNavPanel: {
          links: [
            {
              title: 'Home',
              description: 'Get an overview of what Midiblocks is about',
              link: '/',
              icon: 'fas fa-home'
            },
            {
              title: 'Studio',
              description: 'Visually map and program your MIDI devices',
              link: '/studio',
              icon: 'fas fa-puzzle-piece fa-flip-both'
            },
            {
              title: 'Factory',
              description: 'Create custom blocks with JavaScript',
              link: '/factory',
              icon: 'fas fa-laptop-code'
            },
            {
              title: 'Library',
              description: 'Browse our library of user created Midiblocks and learn how to use them',
              link: '/library',
              icon: 'fas fa-cubes'
            }
          ]
        },
        user: {
          isLoggedIn: false
        }
      }
    },
  
    /**
     * Don't send post data
     */
    post () {
      return {}
    },

    /**
     * Library
     */
    library () {
      return {
        "blocks": [
          {
            "type": "midi_send_note",
            "title": "midi_send_note",
            "short_description": [
              "Sends a MIDI note to a specific device and channel"
            ],
            "block_definition": [
              "{\r\n  \"type\": \"midi_send_note\",\r\n  \"message0\": \"Play note %1 on device %2 on channel %3\",\r\n  \"args0\": [\r\n    {\r\n      \"type\": \"field_input\",\r\n      \"name\": \"note\",\r\n      \"text\": \"C\"\r\n    },\r\n    {\r\n      \"type\": \"field_input\",\r\n      \"name\": \"device\",\r\n      \"text\": \"all\"\r\n    },\r\n    {\r\n      \"type\": \"field_input\",\r\n      \"name\": \"channel\",\r\n      \"text\": \"all\"\r\n    }\r\n  ],\r\n  \"previousStatement\": null,\r\n  \"nextStatement\": null,\r\n  \"colour\": 60,\r\n  \"tooltip\": \"\",\r\n  \"helpUrl\": \"\"\r\n}"
            ]
          },
          {
            "type": "midi_on_event",
            "title": "midi_on_event",
            "short_description": [
              "Runs the midiblock when the selected MIDI event is triggered from the specified device. Attach MIDI Args to the right to fine-tune the event"
            ],
            "block_definition": [
              "{\r\n  \"type\": \"midi_on_event\",\r\n  \"message0\": \"On MIDI %1 from device %2 %3 %4\",\r\n  \"args0\": [\r\n    {\r\n      \"type\": \"field_dropdown\",\r\n      \"name\": \"event\",\r\n      \"options\": [\r\n        [\r\n          \"Note On\",\r\n          \"noteon\"\r\n        ],\r\n        [\r\n          \"Note Off\",\r\n          \"noteoff\"\r\n        ],\r\n        [\r\n          \"Control Change\",\r\n          \"controlchange\"\r\n        ]\r\n      ]\r\n    },\r\n    {\r\n      \"type\": \"field_input\",\r\n      \"name\": \"device\",\r\n      \"text\": \"any\"\r\n    },\r\n    {\r\n      \"type\": \"input_value\",\r\n      \"name\": \"args\",\r\n      \"check\": \"midi_arg\"\r\n    },\r\n    {\r\n      \"type\": \"input_statement\",\r\n      \"name\": \"statements\"\r\n    }\r\n  ],\r\n  \"inputsInline\": false,\r\n  \"colour\": 60,\r\n  \"tooltip\": \"Runs the midiblock when the selected MIDI event is triggered from the specified device. Attach MIDI Args to the right to fine-tune the event\",\r\n  \"helpUrl\": \"https://midiblocks.com/block/midi_on_event\"\r\n}"
            ]
          },
          {
            "type": "midi_arg_compare_note",
            "title": "midi_arg_compare_note",
            "short_description": [
              "Used to modify the requirements of a <a href=\"https://midiblocks.com/block_category/midi-events/\">MIDI Event</a> to also require that a note is or isn't played."
            ],
            "block_definition": [
              "{\r\n  \"type\": \"midi_arg_compare_note\",\r\n  \"message0\": \"when note %1 %2 %3\",\r\n  \"args0\": [\r\n    {\r\n      \"type\": \"field_dropdown\",\r\n      \"name\": \"condition\",\r\n      \"options\": [\r\n        [\r\n          \"is\",\r\n          \"is\"\r\n        ],\r\n        [\r\n          \"is not\",\r\n          \"is not\"\r\n        ]\r\n      ]\r\n    },\r\n    {\r\n      \"type\": \"field_input\",\r\n      \"name\": \"note\",\r\n      \"text\": \"any\"\r\n    },\r\n    {\r\n      \"type\": \"input_value\",\r\n      \"name\": \"args\",\r\n      \"check\": \"midi_arg\"\r\n    }\r\n  ],\r\n  \"output\": \"midi_arg\",\r\n  \"colour\": 45,\r\n  \"tooltip\": \"Compares the MIDI note\",\r\n  \"helpUrl\": \"https://midiblocks.com/block/midi_arg_compare_note\"\r\n}"
            ]
          }
        ]
      }
    }
  }
}