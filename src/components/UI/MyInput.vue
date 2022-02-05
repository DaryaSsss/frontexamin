<template>
  <input :value="modelValue" @input="updateInput" type="text" />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
input {
  width: 96%;
  height: 18px;
  border: 2px solid #c0c0c0;
  border-radius: 5px;
  padding: 7px 11px;
  margin-top: 10px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
input:hover {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #c0c0c0;
}
</style>
