<template>
  <div>
    <h1>Объявления на Brom.ru</h1>
    <my-button @click="this.createCar">Опубликовать машину</my-button>
    <my-button @click="this.createApart" style="margin-left: 15px"
      >Опубликовать квартиру</my-button
    >
    <modal-window v-model:show="dialogVisible">
      <div v-if="this.objToCreate.type == 'car'">
        <h2>Опубликовать машину</h2>
        <h3>Автомобиль:</h3>
        <div style="display: inline-block; width: 30%; margin-right: 10px">
          <p>Модель автомобиля</p>
          <my-input v-model="objToCreate.model"></my-input>
        </div>
        <div
          style="
            display: inline-block;
            width: 30%;
            margin-right: 10px;
            margin-left: 10px;
          "
        >
          <p>Цена автомобиля</p>
          <my-input v-model="objToCreate.price"></my-input>
        </div>
        <div
          style="
            display: inline-block;
            width: 30%;
            margin-right: 10px;
            margin-left: 10px;
          "
        >
          <p>Кузов</p>
          <my-input v-model="objToCreate.car_type"></my-input>
        </div>
        <div style="display: inline-block; width: 30%; margin-right: 10px">
          <p>Объём двигателя</p>
          <my-input v-model="objToCreate.engine_volume"></my-input>
        </div>
        <div
          style="
            display: inline-block;
            width: 30%;
            margin-right: 10px;
            margin-left: 10px;
          "
        >
          <p>Мощность двигателя</p>
          <my-input v-model="objToCreate.engine_power"></my-input>
        </div>

        <br />

        <h3>Контакты</h3>
        <p style="margin: 1px">Город</p>
        <select
          v-if="form"
          v-model="objToCreate.city"
          name="select"
          class="select"
        >
          <option
            v-for="(option, i) in form.fields.city.values"
            :key="i"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <p style="margin: 1px">Адрес</p>
        <my-input v-model="objToCreate.address"></my-input>
        <p style="margin: 1px">Телефон</p>
        <my-input v-model="objToCreate.phone"></my-input>

        <my-button @click="this.sendCar" style="margin-top: 10px"
          >Опубликовать</my-button
        >
      </div>
      <div v-if="this.objToCreate.type == 'apartment'">
        <h2>Опубликовать квартиру</h2>
        <h3>Квартира:</h3>
        <div style="display: inline-block; width: 30%; margin-right: 10px">
          <p>Комнат</p>
          <my-input v-model="objToCreate.rooms"></my-input>
        </div>
        <div
          style="
            display: inline-block;
            width: 30%;
            margin-right: 10px;
            margin-left: 10px;
          "
        >
          <p>Цена</p>
          <my-input v-model="objToCreate.price"></my-input>
        </div>
        <div
          style="
            display: inline-block;
            width: 30%;
            margin-right: 10px;
            margin-left: 10px;
          "
        >
          <p>Площадь:</p>
          <my-input v-model="objToCreate.square"></my-input>
        </div>
        <br />

        <h3>Контакты</h3>
        <p style="margin: 1px">Город</p>
        <select
          v-if="form"
          v-model="objToCreate.city"
          name="select"
          class="select"
        >
          <option
            v-for="(option, i) in form.fields.city.values"
            :key="i"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <p style="margin: 1px">Адрес</p>
        <my-input v-model="objToCreate.address"></my-input>
        <p style="margin: 1px">Телефон</p>
        <my-input v-model="objToCreate.phone"></my-input>

        <my-button @click="this.sendCar" style="margin-top: 10px"
          >Опубликовать</my-button
        >
      </div>
    </modal-window>
    <post-list
      :posts="this.$store.state.posts"
      @remove="deletePost"
      v-if="!isPostLoading"
    />
    <div v-else>
      <loading
        v-model:active="this.isPostLoading"
        :can-cancel="false"
        :is-full-page="true"
        :color="'#008000'"
      />
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import PostList from "@/components/PostList";
import axios from "axios";
import MyInput from "@/components/UI/MyInput";
import { mapActions } from "vuex";
import MyButton from "../components/UI/MyButton";
import ModalWindow from "../components/UI/ModalWindow";

export default {
  components: {
    ModalWindow,
    MyButton,
    MyInput,
    PostList,
    Loading,
  },
  data() {
    return {
      posts: [],
      objToCreate: {},
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 0,
      limit: 10,
      totalPage: 0,
      form: null,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },
  methods: {
    createCar() {
      this.objToCreate = {
        type: "car",
        city: "",
        address: "",
        phone: "",
        price: "",
        model: "",
        car_type: "",
        engine_volume: "",
        engine_power: "",
      };
      this.dialogVisible = true;
    },
    sendCar() {
      axios.post(
        "https://demo-api.vsdev.space/api/brom/sales",
        this.objToCreate
      );
      this.dialogVisible = false;
      this.objToCreate = {};
      this.fetchPosts();
    },
    createApart() {
      this.objToCreate = {
        type: "apartment",
        city: "",
        address: "",
        phone: "",
        price: "",
        rooms: "",
        square: "",
      };
      this.dialogVisible = true;
    },
    sendApart() {
      axios.post(
        "https://demo-api.vsdev.space/api/brom/sales",
        this.objToCreate
      );
      this.dialogVisible = false;
      this.objToCreate = {};
      this.fetchPosts();
    },
    showDialog() {
      this.dialogVisible = true;
    },
    ...mapActions(["fetchPosts"]),
  },
  async created() {
    const response = await axios.get(
      "https://demo-api.vsdev.space/api/brom/sales/form"
    );
    this.form = await response.data;
    console.log(response);
  },
  beforeMount() {
    this.fetchPosts();
  },
};
</script>

<style>
.app_btns {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid green;
  background: transparent;
  color: black;
  padding: 10px;
}

.current-page {
  background: green;
  color: white;
}

.observer {
  height: 30px;
  background: transparent;
}
.select {
  width: auto;
  height: 30px;
  border: 2px solid #c0c0c0;
  border-radius: 5px;
  padding: 7px 11px;
  margin-top: 10px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
}
.select:hover {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
.select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
</style>
