export default [
  {
    tag: 'category',
    name: 'MIDI Events',
    icon: 'fas fa-broadcast-tower',
    colour: '#fad000',
    children: [
      {
        tag: 'block',
        type: 'midi_on_event'
      }
    ]
  },
  {
    tag: 'category',
    name: 'MIDI Arguments',
    icon: 'fas fa-cogs',
    colour: '#FF9D00',
    children: [
      {
        tag: 'block',
        type: 'midi_arg_compare_note'
      }
    ]
  },  
  {
    tag: 'category',
    name: 'Send MIDI',
    icon: 'fab fa-usb',
    colour: '#2EC4B6',
    children: [
      {
        tag: 'block',
        type: 'midi_send_note'
      }
    ]
  },
  {
    tag: 'sep',
    children: []
  },
  {
    tag: 'category',
    name: 'Logic',
    colour: '#5D37F0',
    icon: 'fas fa-filter',
    children: [
      {
        tag: 'block',
        type: 'controls_if'
      },
      {
        tag: 'block',
        type: 'logic_compare',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'EQ'
          }
        ]
      },
      {
        tag: 'block',
        type: 'logic_operation',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'AND'
          }
        ]
      },
      {
        tag: 'block',
        type: 'logic_negate'
      },
      {
        tag: 'block',
        type: 'logic_boolean',
        children: [
          {
            tag: 'field',
            name: 'BOOL',
            value: 'TRUE'
          }
        ]
      },
      {
        tag: 'block',
        type: 'logic_null'
      },
      {
        tag: 'block',
        type: 'logic_ternary'
      }
    ]
  },
  {
    tag: 'category',
    name: 'Loops',
    colour: '#2ca300',
    icon: 'fas fa-infinity',
    children: [
      {
        tag: 'block',
        type: 'controls_repeat_ext',
        children: [
          {
            tag: 'value',
            name: 'TIMES',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 10
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'controls_whileUntil',
        children: [
          {
            tag: 'field',
            name: 'MODE',
            value: 'WHILE'
          }
        ]
      },
      {
        tag: 'block',
        type: 'controls_for',
        children: [
          {
            tag: 'field',
            name: 'VAR',
            id: '+x@[E{uUuMC(G!%lB~vF',
            value: 'i'
          },
          {
            tag: 'value',
            name: 'FROM',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'TO',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 10
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'BY',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        tag: 'block',
        type: 'controls_forEach',
        children: [
          {
            tag: 'field',
            name: 'VAR',
            id: 'E`D{pL/f#h?~8#[VL5rC',
            value: 'j'
          }
        ]
      },
      {
        tag: 'block',
        type: 'controls_flow_statements',
        children: [
          {
            tag: 'field',
            name: 'FLOW',
            value: 'BREAK'
          }
        ]
      }
    ]
  },  
  {
    tag: 'category',
    name: 'Math',
    colour: '#A599E9',
    icon: 'fas fa-calculator',
    children: [
      {
        tag: 'block',
        type: 'math_number',
        children: [
          {
            tag: 'field',
            name: 'NUM',
            value: 0
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_arithmetic',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'ADD'
          },
          {
            tag: 'value',
            name: 'A',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'B',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_single',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'ROOT'
          },
          {
            tag: 'value',
            name: 'NUM',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 9
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_trig',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'SIN'
          },
          {
            tag: 'value',
            name: 'NUM',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 45
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_constant',
        children: [
          {
            tag: 'field',
            name: 'CONSTANT',
            value: 'PI'
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_number_property',
        children: [
          {
            tag: 'mutation',
            divisor_input: 'false',
          },
          {
            tag: 'field',
            name: 'PROPERTY',
            value: 'EVEN'
          },
          {
            tag: 'value',
            name: 'NUMBER_TO_CHECK',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 0
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_round',
        children: [
          {
            tag: 'field',
            name: 'OP',
            value: 'ROUND'
          },
          {
            tag: 'value',
            name: 'NUM',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 3.1
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_on_list',
        children: [
          {
            tag: 'mutation',
            op: 'SUM'
          },
          {
            tag: 'field',
            name: 'OP',
            value: 'SUM'
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_modulo',
        children: [
          {
            tag: 'value',
            name: 'DIVIDEND',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 64
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'DIVISOR',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 10
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_constrain',
        children: [
          {
            tag: 'value',
            name: 'VALUE',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 50
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'LOW',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'HIGH',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 100
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_random_int',
        children: [
          {
            tag: 'value',
            name: 'FROM',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 1
                  }
                ]
              }
            ]
          },
          {
            tag: 'value',
            name: 'TO',
            children: [
              {
                tag: 'shadow',
                type: 'math_number',
                children: [
                  {
                    tag: 'field',
                    name: 'NUM',
                    value: 100
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'math_random_float'
      }
    ]
  },    










  /**
   * Unused Core Blockly blocks
   */
  // {
  //   tag: 'category',
  //   name: 'Text',
  //   colour: '#5ba58c',
  //   children: [
  //     {
  //       tag: 'block',
  //       type: 'text',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'TEXT'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_join',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           items: '2'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_append',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'AHM@IhCozpbm(mnOWJdU',
  //           value: 'item'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'TEXT',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT'
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_length',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'VALUE',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_isEmpty',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'VALUE',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT'
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_indexOf',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'END',
  //           value: 'FIRST'
  //         }
  //         ,
  //         {
  //           tag: 'value',
  //           name: 'VALUE'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'IKPMutPmnS`RhpSFFD-*',
  //           value: 'text'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'FIND',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_charAt',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           at: 'true',
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE',
  //           value: 'FROM_START'
  //         }
  //         ,
  //         {
  //           tag: 'value',
  //           name: 'VALUE'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'IKPMutPmnS`RhpSFFD-*',
  //           value: 'text'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_getSubstring',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           at1: 'true',
  //           at2: 'true'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE1',
  //           value: 'FROM_START'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE2',
  //           value: 'FROM_START'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'STRING'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'IKPMutPmnS`RhpSFFD-*',
  //           value: 'text'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_changeCase',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'CASE',
  //           value: 'UPPERCASE'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'TEXT',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_trim',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'MODE',
  //           value: 'BOTH'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'TEXT',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_print',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'TEXT',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'text_prompt_ext',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           type: 'TEXT'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'TYPE',
  //           value: 'TEXT'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'TEXT',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT',
  //                   value: abc
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },  
  // {
  //   tag: 'category',
  //   name: 'Lists',
  //   colour: '#745ba5',
  //   children: [
  //     {
  //       tag: 'block',
  //       type: 'lists_create_with',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           items: '0'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_create_with',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           items: '3'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_repeat',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'NUM',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'math_number',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'NUM',
  //                   value: 5
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_length'
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_isEmpty'
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_indexOf',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'END',
  //           value: 'FIRST'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'VALUE'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'FCjet]zykpk;L@@J9Ht,',
  //           value: 'list'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_getIndex',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           statement: 'false',
  //           at: 'true'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'MODE',
  //           value: 'GET'
  //         }
  //       ],
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'WHERE',
  //           value: 'FROM_START'
  //         }
  //         ,
  //         {
  //           tag: 'value',
  //           name: 'VALUE'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'FCjet]zykpk;L@@J9Ht,',
  //           value: 'list'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_setIndex',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           at: 'true'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'MODE',
  //           value: 'SET'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE',
  //           value: 'FROM_START'
  //         }
  //         ,
  //         {
  //           tag: 'value',
  //           name: 'LIST'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'FCjet]zykpk;L@@J9Ht,',
  //           value: 'list'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_getSublist',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           at1: 'true',
  //           at2: 'true',
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE1',
  //           value: 'FROM_START'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'WHERE2',
  //           value: 'FROM_START'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'LIST'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'variables_get',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'VAR',
  //           id: 'FCjet]zykpk;L@@J9Ht,',
  //           value: 'list'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_split',
  //       children: [
  //         {
  //           tag: 'mutation',
  //           mode: 'SPLIT'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'MODE',
  //           value: 'SPLIT'
  //         },
  //         {
  //           tag: 'value',
  //           name: 'DELIM',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'text',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'TEXT'
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'lists_sort',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'TYPE',
  //           value: 'NUMERIC'
  //         },
  //         {
  //           tag: 'field',
  //           name: 'DIRECTION',
  //           value: 1
  //         }
  //       ]
  //     }
  //   ]
  // },        
  // {
  //   tag: 'category',
  //   name: 'Color',
  //   colour: '#a5745b',
  //   children: [
  //     {
  //       tag: 'block',
  //       type: 'colour_picker',
  //       children: [
  //         {
  //           tag: 'field',
  //           name: 'COLOUR',
  //           value: '#ff0000'
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'colour_random'
  //     },
  //     {
  //       tag: 'block',
  //       type: 'colour_rgb',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'RED',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'math_number',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'NUM',
  //                   value: 100
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           tag: 'value',
  //           name: 'GREEN',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'math_number',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'NUM',
  //                   value: 50
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           tag: 'value',
  //           name: 'BLUE',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'math_number',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'NUM',
  //                   value: 0
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       tag: 'block',
  //       type: 'colour_blend',
  //       children: [
  //         {
  //           tag: 'value',
  //           name: 'COLOUR1',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'colour_picker',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'COLOUR',
  //                   value: '#ff0000'
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           tag: 'value',
  //           name: 'COLOUR2',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'colour_picker',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'COLOUR',
  //                   value: '#3333ff'
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           tag: 'value',
  //           name: 'RATIO',
  //           children: [
  //             {
  //               tag: 'shadow',
  //               type: 'math_number',
  //               children: [
  //                 {
  //                   tag: 'field',
  //                   name: 'NUM',
  //                   value: 0.5
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },

  {
    tag: 'sep',
    children: []
  },  
  {
    tag: 'category',
    name: 'Variables',
    icon: 'fas fa-box',
    colour: '#ff628c',
    custom: 'VARIABLE',
    children: []
  },
  {
    tag: 'category',
    name: 'Functions',
    colour: '#ff628c',
    icon: 'fas fa-plug',
    custom: 'PROCEDURE',
    children: []
  }
]