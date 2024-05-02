<script setup lang="ts">
import './HomePage.scss';

import { checkboxArray, quizCard } from '../../utils/constants';

import QuizCard from '../../components/QuizCard/QuizCard.vue';
import BaseInput from '../../components/UI/BaseInput/BaseInput.vue';
import BaseCheckBox from '../../components/UI/BaseCheckBox/BaseCheckBox.vue';

const search = ref('');
const checkboxSorting = ref<string[]>([]);

const filteredQuizArray = computed(() => {
  return quizCard.filter((quiz) => {
    const matchesTitle = quiz.title
      .toLowerCase()
      .includes(search.value.toLowerCase());

    const matchesType =
      checkboxSorting.value.length === 0 ||
      checkboxSorting.value.includes(quiz.type);
    return matchesTitle && matchesType;
  });
});
</script>

<template>
  <section class="home">
    <form name="menu" class="home__menu">
      <BaseInput
        v-model="search"
        type="text"
        name="search"
        placeholder="TS, JS, а может быть C#?"
      />
      <span class="home__choice">Направление:</span>
      <div class="home__container">
        <BaseCheckBox
          v-for="checkbox in checkboxArray"
          v-model="checkboxSorting"
          :key="checkbox.id"
          :name="checkbox.id"
          :id="checkbox.id"
          :value="checkbox.id"
          :label="checkbox.label"
        />
      </div>
    </form>
    <ul class="home__cards">
      <li v-for="card in filteredQuizArray" :key="card.id">
        <QuizCard :card="card" />
      </li>
    </ul>
  </section>
</template>
