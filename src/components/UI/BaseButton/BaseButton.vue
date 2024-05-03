<script setup lang="ts">
import './BaseButton.scss';

interface Props {
  type: 'button' | 'submit' | 'reset';
  textButton: string;
  disabled?: boolean;
}

const emit = defineEmits<{ (event: 'click'): void }>();

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const handleClickButton = () => emit('click');
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    @click="handleClickButton"
    class="button"
  >
    {{ textButton }}
  </button>
</template>
