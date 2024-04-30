<script setup lang="ts">
import './Header.scss';

import { headerLinks } from '../../utils/constants';

import BaseLink from '../../components/UI/BaseLink/BaseLink.vue';
</script>

<template>
  <header class="header">
    <div class="header__content">
      <BaseLink to="/">
        <template #content>
          <img src="/logo.svg" alt="Лого" class="header__logo" />
        </template>
      </BaseLink>
      <h1 class="header__title">QuizGame</h1>
    </div>
    <nav class="header__menu">
      <ul class="header__links">
        <li v-for="link in headerLinks" :key="link.id">
          <BaseLink :to="link.to" :title="link.title" />
        </li>
      </ul>
    </nav>
  </header>
</template>
