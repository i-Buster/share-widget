import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FooterContainer from '../components/FooterContainer';

export default {
  title: 'Example/FooterContainer',
  component: FooterContainer,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    hideCopyLink: { control: 'boolean' },
  },
} as ComponentMeta<typeof FooterContainer>;

const Template: ComponentStory<typeof FooterContainer> = (args) => <FooterContainer {...args} />;

export const LinkVisible = Template.bind({});
LinkVisible.args = {
  hideCopyLink: false,
};

export const LinkHidden = Template.bind({});
LinkHidden.args = {
  hideCopyLink: true,
};
