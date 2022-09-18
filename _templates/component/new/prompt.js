module.exports = [
  {
    type: 'select',
    name: 'component_type',
    message: 'select component type',
    choices: ['ui', 'layout', 'template', 'page'],
  },
  {
    type: 'input',
    name: 'component_name',
    message: 'input component name',
    validate: (input) => input !== '',
  },
  {
    type: 'confirm',
    name: 'require_storybook',
    message: 'need storybook file？',
  },
];
