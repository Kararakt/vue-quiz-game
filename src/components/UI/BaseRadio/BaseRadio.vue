<script setup lang="ts">
import './BaseRadio.scss';

interface Props {
  modelValue: any;
  name: string;
  value: string;
  label: string;
  id: string;
  disabled?: boolean;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

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
      :disabled="disabled"
      class="radio__input"
    />
    <label :for="id" class="radio__label">{{ label }}</label>
  </div>
</template>
