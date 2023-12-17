import { useICP } from "src/hooks/useICP";
import constants from "src/shared/constants";
import contextCommands from "src/shared/contextCommands";
import { useStore } from "src/store/Store";
import { queryClient } from "../queryClient";
import { useLocation } from "wouter-preact";

export const Listener = () => {
  const setLocation = useLocation()[1];
  const removeChannel = useStore((state) => state.removeChannel);

  useICP(constants.CLOSE_KICK_PAGE, () => {
    queryClient.invalidateQueries({ queryKey: ["getUser"] });
  });

  useICP(constants.CONTEXT_MENU_COMMAND, (command, data) => {
    switch (command) {
      case contextCommands.REMOVE_CHANNEL: {
        if (!data || typeof data !== "object" || Array.isArray(data) || !("channel" in data)) {
          return;
        }
        const channel = data.channel as string;
        if (channel) {
          window.electronAPI.removeChannel(channel);
          const otherChannels = useStore.getState().channels.filter((c) => c.name !== channel);
          if (otherChannels.length) {
            setLocation(`/channel/${otherChannels[0].name}`);
          } else {
            setLocation("/");
          }
          removeChannel(channel);
        }
        break;
      }
    }
  });

  return null;
};
