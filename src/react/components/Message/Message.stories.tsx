import { Message } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Message> = {
  title: "Components/Message",
  component: Message,
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default = {
  args: {
    senderName: "Forsen",
    content: "Hello world",
    error: undefined,
    nameColor: undefined,
    kickBadges: [],
  },
} satisfies Story;

export const WithKickBadges = {
  args: {
    senderName: "Forsen",
    content: "Hello world",
    error: undefined,
    nameColor: undefined,
    kickBadges: [
      {
        type: "moderator",
        text: "Moderator",
      },
      {
        type: "sub_gifter",
        text: "Sub Gifter",
      },
      {
        type: "subscriber",
        text: "Subscriber",
      },
      {
        type: "verified",
        text: "Verified",
      },
    ],
  },
} satisfies Story;

export const WithLargeSpam = {
  args: {
    senderName: "Forsen",
    content:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    error: undefined,
    nameColor: undefined,
    kickBadges: [
      {
        type: "moderator",
        text: "Moderator",
      },
      {
        type: "sub_gifter",
        text: "Sub Gifter",
      },
      {
        type: "subscriber",
        text: "Subscriber",
      },
      {
        type: "verified",
        text: "Verified",
      },
    ],
  },
} satisfies Story;
