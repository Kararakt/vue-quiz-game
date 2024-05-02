<script setup lang="ts">
import './BaseRadio.scss';

interface Props {
  modelValue: any;
  name: string;
  value: string;
  label: string;
  id: string;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void;
}>();

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="radio">
    <input
      v-model="modelUpdate"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      class="radio__input"
    />
    <label :for="id" class="radio__label">{{ label }}</label>
  </div>
</template>
