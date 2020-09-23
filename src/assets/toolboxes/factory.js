export default [
  {
    tag: 'category',
    name: 'Input',
    colour: '#5d37f0',
    icon: 'fas fa-puzzle-piece fa-flip-both',
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
    icon: 'fas fa-hand-pointer',
    colour: '#2EC4B6',
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
    colour: '#ff628c',
    icon: 'fas fa-shapes',
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
    name: 'Styles',
    colour: '#fad000',
    icon: 'fas fa-palette',
    children: [
      {
        tag: 'block',
        type: 'styles_color',
        children: [
          {
            tag: 'mutation',
            colour: '#fad000',
            children: [
              {
                tag: 'field',
                name: 'COLOR',
                value: '#fad000'
              }
            ]
          }
        ]
      }
    ]
  }
]