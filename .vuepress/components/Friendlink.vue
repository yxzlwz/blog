<script setup>
import _data from './friendlink.json';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
});

const data = _data[props.type];
</script>

<template>
  <div class="card-list">
    <div class="card" v-for="i in data">
      <div class="card-details">
        <img class="logo" :src="i.logo" />
        <p class="text-title">{{ i.title }}</p>
        <p class="text-body">{{ i.description }}</p>
      </div>
      <a :href="i.url" target="_blank">
        <button class="card-button">点击前往</button>
      </a>
    </div>
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-width: 100%;
  align-items: center;
}

.card {
  width: 250px;
  border-radius: 20px;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  text-align: center;
  margin: 0 10px 30px 10px;
}

.card-details {
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
  margin-bottom: 5px;
}

.logo {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: auto;
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #24a0ff;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(182, 182, 182);
  margin: 0;
  line-height: 1.5rem;
}

.text-title {
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

.card:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
</style>
