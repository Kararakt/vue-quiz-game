<script setup lang="ts">
import './BaseInput.scss';

interface Props {
  modelValue: string;
  type: 'text' | 'password' | 'email';
  name: string;
  placeholder: string;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});
</script>

<template>
  <input
    v-model="modelUpdate"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    autocomplete="off"
    class="input"
  />
</template>
