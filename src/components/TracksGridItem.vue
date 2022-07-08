<template>
  <div>
    <img :src="item.albumImageUrl" alt="album's cover" />

    <ul>
      <li>Track Name: {{ item.trackName }}</li>
      <li>Artist Name: {{ item.artistName }}</li>
      <li>Spotify Url: {{ item.spotifyUrl }}</li>
      <li>Played At: {{ item.playedAt }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
