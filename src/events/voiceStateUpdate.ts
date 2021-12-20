import { Event } from "../interfaces/Event";
import { VoiceState } from "discord.js";
export const event: Event = {
  name: "voiceStateUpdate",
  run: async (client, oldState: VoiceState, newState: VoiceState) => {
    // let voiceState = await client.cache.get(`${newState.id}+v`))

    // check if I can log the state

    if (!oldState.channelId && newState.channelId) {
      const voiceCache = await client.cache.get(
        `${oldState.member.user.id}+vc`
      );

      if (client.cache.get(`vk${oldState.member.user.id}`))
        newState.member.voice.disconnect();

      if (voiceCache) {
        newState.member.voice.setMute(false);
        await client.cache.del(`${newState.member.user.id}+vc`);
        console.log("serverUnmuted " + newState.member.user.username);
      }
    }
  },
};
