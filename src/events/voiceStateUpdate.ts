import { Event } from "../interfaces/Event";
import { VoiceState } from "discord.js";
export const event: Event = {
  name: "voiceStateUpdate",
  run: (client, oldState: VoiceState, newState: VoiceState) => {
    // let voiceState = await client.cache.get(`${newState.id}+v`))

    // check if I can log the state

    if (oldState.channelId && newState.channelId == null) {
      console.log(
        `${newState.member.user} has leaved the voice channel ${oldState.channel.name}`
      );
    }

    // if (!oldState.voice.channel === null && newState.voice.channel) {
    //   console.log(`${newState.username} has logged into ${newState.user}`);
    // }
  },
};
