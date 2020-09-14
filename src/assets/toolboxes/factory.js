export default [
  {
    tag: 'category',
    name: 'Input',
    children: [
      {
        tag: 'block',
        type: 'input_value',
        children: [
          {
            tag: 'value',
            name: 'TYPE',
            children: [
              {
                tag: 'shadow',
                type: 'type_null'
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'input_statement',
        children: [
          {
            tag: 'value',
            name: 'TYPE',
            children: [
              {
                tag: 'shadow',
                type: 'type_null'
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'input_dummy'
      },
    ]
  }, 
  {
    tag: 'category',
    name: 'Field',
    children: [
      {
        tag: 'block',
        type: 'field_static'
      },
      {
        tag: 'block',
        type: 'field_input'
      },
      {
        tag: 'block',
        type: 'field_number'
      },
      {
        tag: 'block',
        type: 'field_angle'
      },
      {
        tag: 'block',
        type: 'field_dropdown'
      },
      {
        tag: 'block',
        type: 'field_checkbox'
      },
      {
        tag: 'block',
        type: 'field_colour'
      },
      {
        tag: 'block',
        type: 'field_variable'
      },
      {
        tag: 'block',
        type: 'field_image'
      }
    ]
  },   
  {
    tag: 'category',
    name: 'Type',
    children: [
      {
        tag: 'block',
        type: 'type_group'
      },
      {
        tag: 'block',
        type: 'type_null'
      },
      {
        tag: 'block',
        type: 'type_boolean'
      },
      {
        tag: 'block',
        type: 'type_number'
      },
      {
        tag: 'block',
        type: 'type_string'
      },
      {
        tag: 'block',
        type: 'type_list'
      },
      {
        tag: 'block',
        type: 'type_other'
      }
    ]
  },   
  {
    tag: 'category',
    name: 'Colour',
    children: [
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '20',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 2
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '65',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 6
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '120',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 12
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '160',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 16
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '210',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 21
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '230',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 23
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '260',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 26
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '290',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 29
              }
            ]
          }
        ]
      },
      {
        tag: 'block',
        type: 'colour_hue',
        children: [
          {
            tag: 'mutation',
            colour: '330',
            children: [
              {
                tag: 'field',
                name: 'HUE',
                value: 33
              }
            ]
          }
        ]
      }
    ]
  }
]