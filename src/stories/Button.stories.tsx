import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CustomButton } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: CustomButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CustomButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomButton> = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  hasIcon: true,
  label: 'Share',
};

export const Secondary = Template.bind({});
Secondary.args = {
  hasIcon: false,
  label: 'Button without Icon',
};


