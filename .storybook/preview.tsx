import type { Preview } from "@storybook/react";
import { h } from "preact";
import '../src/react/styles/global.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{
        padding: '1rem',
        minWidth: 400,
        boxShadow: '8px 9px 57px 0px rgba(161,0,255,0.42)',
        borderRadius: '4px',
        background: 'var(--content-bg-color)',
        position: 'relative'
        }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default preview;