<script setup lang="ts">
import './BaseCheckBox.scss';

interface Props {
  modelValue: string[];
  name: string;
  id: string;
  value: string;
  label: string;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void;
}>();

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: string[]) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="checkbox">
    <input
      v-model="modelUpdate"
      type="checkbox"
      :name="name"
      :id="id"
      :value="value"
      class="checkbox__input"
    />
    <label :for="id" class="checkbox__label">{{ label }}</label>
  </div>
</template>
