import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ShareButton from "../components/ShareButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/ShareButton',
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShareButton> = (args) => <ShareButton {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args


export const Primary = Template.bind({});

export const Custom = Template.bind({});
Custom.args = {
  buttonColor: 'blue',
  buttonText: 'Custom'
};

