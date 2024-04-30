<script setup lang="ts">
import './BaseLink.scss';

interface Props {
  to: string;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <RouterLink :to="to" class="link" active-class="link_active">
    <template v-if="title">{{ title }}</template>
    <template v-else>
      <slot name="content" />
    </template>
  </RouterLink>
</template>
