<template>
    <div>
        <wl-downloadapp/>
        <nuxt :class="{has_wl_downloadapp:$store.state.downloadapp_show}" />
        <wl-footer/>
    </div>
</template>

<script>
    import wlDownloadapp from "../components/wl-downloadapp";
    import wlHeader from "../components/wl-header";
    import wlFooter from "../components/wl-footer";
    export default {
      components: { wlDownloadapp, wlFooter }
    };
</script>
