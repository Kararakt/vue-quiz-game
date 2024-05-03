<script setup lang="ts">
import './QuizPage.scss';

import {
  quizCard,
  quizVue,
  quizJS,
  quizTS,
  quizSharp,
} from '../../utils/constants';
import { QuizItem } from '../../models/models';

import BaseRadio from '../../components/UI/BaseRadio/BaseRadio.vue';
import BaseButton from '../../components/UI/BaseButton/BaseButton.vue';
import BaseLink from '../../components/UI/BaseLink/BaseLink.vue';

const router = useRoute();
const id = router.params.id;

const mainQuiz = ref<QuizItem[]>([]);
const result = ref<string | null>(null);
const modelQuiz = ref<Record<string, string>>({});
const answerStatus = ref<Record<string, string>>({});

// Все викторины в объекте
const quizzes: { [key: string]: QuizItem[] } = {
  vue: quizVue,
  js: quizJS,
  ts: quizTS,
  sharp: quizSharp,
};

// Вычисляемое свойство, которое возвращает объект текущей викторины на основе идентификатора из URL
const quizGame = computed(() => quizCard.filter((item) => item.id === id)[0]);

// Вычисляемое свойство для проверки, должны ли быть отключены радиокнопки
const isRadioDisabled = computed(() => result.value !== null);

// Вычисляемое свойство для проверки, должна ли быть отключена кнопка
const isButtonDisabled = computed(() => {
  const allQuestionsAnswered = mainQuiz.value.every(
    (quiz) => modelQuiz.value[quiz.id]
  );

  return !allQuestionsAnswered || isRadioDisabled.value;
});

// Функция для подсчета количества правильных ответов в викторине
const calculateCorrectAnswers = (quiz: QuizItem[]) => {
  return quiz.reduce((correctCount, quiz) => {
    const questionId = String(quiz.id);
    const userAnswer = modelQuiz.value[questionId];
    const correctAnswer = quiz.correctAnswer;

    return userAnswer === correctAnswer ? correctCount + 1 : correctCount;
  }, 0);
};

// Функция для обработки события проверки ответов
const handleCheckAnswers = () => {
  const correctCount = calculateCorrectAnswers(mainQuiz.value);

  mainQuiz.value.forEach((quiz) => {
    const questionId = String(quiz.id);
    const userAnswer = modelQuiz.value[questionId];
    const correctAnswer = quiz.correctAnswer;

    answerStatus.value[questionId] =
      userAnswer === correctAnswer
        ? 'quiz__title_correct'
        : 'quiz__title_incorrect';

    localStorage.setItem(
      `answerStatus-${quizGame.value.id}`,
      JSON.stringify(answerStatus.value)
    );
  });

  result.value = `${correctCount} из ${mainQuiz.value.length}`;
  localStorage.setItem(`result-${quizGame.value.id}`, result.value);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const handleEndQuiz = () => {
  localStorage.removeItem(quizGame.value.id);
  localStorage.removeItem(`result-${quizGame.value.id}`);
  localStorage.removeItem(`answers-${quizGame.value.id}`);
  localStorage.removeItem(`answerStatus-${quizGame.value.id}`);
};

// Функция, которая принимает массив вопросов викторины и возвращает новый массив вопросов в случайном порядке
const shuffleQuiz = (quiz: QuizItem[]) => {
  return quiz
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

//  Загружает викторину из localStorage или генерирует новую викторину, загружает ответы и результат из localStorage, если они доступны, и сохраняет викторину в localStorage
onMounted(() => {
  const quiz = quizzes[quizGame.value.id];

  const storedQuiz = localStorage.getItem(quizGame.value.id);
  const storedAnswers = localStorage.getItem(`answers-${quizGame.value.id}`);
  const storedResult = localStorage.getItem(`result-${quizGame.value.id}`);
  const storedAnswerStatus = localStorage.getItem(
    `answerStatus-${quizGame.value.id}`
  );

  mainQuiz.value = storedQuiz
    ? JSON.parse(storedQuiz)
    : quiz
    ? shuffleQuiz(quiz).slice(0, 10)
    : [];

  if (mainQuiz.value.length === 0) {
    console.error('Неверный идентификатор для викторины');
  } else {
    localStorage.setItem(quizGame.value.id, JSON.stringify(mainQuiz.value));
  }

  modelQuiz.value = storedAnswers ? JSON.parse(storedAnswers) : {};

  result.value = storedResult || null;

  answerStatus.value = storedAnswerStatus ? JSON.parse(storedAnswerStatus) : {};
});

//  Следит за изменениями в modelQuiz.value и сохраняет ответы в local storage при изменении
watch(
  () => modelQuiz.value,
  () => {
    localStorage.setItem(
      `answers-${quizGame.value.id}`,
      JSON.stringify(modelQuiz.value)
    );
  },
  { deep: true }
);
</script>

<template>
  <section class="quiz">
    <div class="quiz__nav" v-show="result">
      <BaseLink to="/" title="Закончить квиз" @click="handleEndQuiz" />
      <p class="quiz__result">Правильные ответы: {{ result }}</p>
    </div>
    <form
      name="quiz"
      class="quiz__container"
      @submit.prevent="handleCheckAnswers"
    >
      <div
        v-for="(quiz, index) in mainQuiz"
        :key="quiz.id"
        class="quiz__question"
      >
        <h3 class="quiz__title" :class="answerStatus[quiz.id]">
          {{ index + 1 }}. {{ quiz.question }}
        </h3>
        <BaseRadio
          v-for="(option, index) in quiz.options"
          :key="index"
          v-model="modelQuiz[quiz.id]"
          :name="`option-${quiz.id}-${index}`"
          :value="option"
          :label="option"
          :id="`option-${quiz.id}-${index}`"
          :disabled="isRadioDisabled"
          @update:modelValue="(newValue) => (modelQuiz[quiz.id] = newValue)"
        />
      </div>
      <BaseButton
        type="submit"
        textButton="Проверить!"
        :disabled="isButtonDisabled"
        class="quiz__button"
      />
    </form>
  </section>
</template>
