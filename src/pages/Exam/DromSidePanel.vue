<template>
  <div class="side-panel" style="">
    <div class="side-panel-content">
      <div class="navigation">
        <router-link :to="'/'" class="router-link">Главная</router-link>
        <router-link :to="'/store'" class="router-link">Объявления</router-link>
        <router-link :to="'/about'" class="router-link">О нас</router-link>
      </div>
      <div class="vidgets">
        <h2>Количество объявлений в базе brom.ru:</h2>
        <h3>Квартиры: {{ this.$store.state.vidgets.apartments }}</h3>
        <h3>Машины: {{ this.$store.state.vidgets.cars }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DromSidePanel",
  components: {},

  methods: {
    ...mapActions(["fetchVidgets"]),
  },
  beforeMount() {
    this.fetchVidgets();
  },
};
</script>

<style scoped>
.navigation {
  width: 90%;
}
.side-panel {
  display: inline-block;
  width: 20%;
  border-right: 2px solid #ffff;
  vertical-align: top;
  height: 100vh;
}
.side-panel-content {
  margin-top: 75px;
  top: 75px;
  border: 2px solid #c0c0c0;
  padding: 10px;
  border-radius: 5px;
}

.router-link {
  display: block;
  width: 96%;
  height: 18px;
  border: 2px solid #c0c0c0;
  border-radius: 5px;
  padding: 7px 11px;
  margin-top: 10px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-decoration: none;
  color: black;
}
.router-link:hover {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
.router-link:focus {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
</style>
