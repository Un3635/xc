<template>
  <div>
    <wl-downloadapp/>
    <div :class="{has_wl_downloadapp:$store.state.downloadapp_show}">
      <wl-header/>
      <nuxt/>
      <wl-footer/>
    </div>
  </div>
</template>
<script>
  import wlDownloadapp from "../components/wl-downloadapp";
  import wlHeader from "../components/wl-header";
  import wlFooter from "../components/wl-footer";
  export default {
    components: { wlDownloadapp, wlHeader, wlFooter }
  };
</script>
