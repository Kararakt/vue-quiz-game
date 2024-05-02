<script setup lang="ts">
import './QuizCard.scss';

import { QuizCard } from '../../models/models';

import BaseLink from '../UI/BaseLink/BaseLink.vue';

defineProps<{ card: QuizCard }>();
</script>

<template>
  <BaseLink :to="`/${card.id}`" class="quiz-card">
    <template #content>
      <img
        :src="card.image"
        :alt="`Лого ${card.title}`"
        class="quiz-card__image"
      />
      <div class="quiz-card__container">
        <h3 class="quiz-card__title">{{ card.title }}</h3>
        <span
          >Направление: {{ card.type === 'common' ? 'общие' : card.type }}</span
        >
        <p>
          <font-awesome-icon
            icon="fa-solid fa-list-ol"
            class="quiz-card__icon"
          />
          10 вопросов
        </p>
      </div>
    </template>
  </BaseLink>
</template>
