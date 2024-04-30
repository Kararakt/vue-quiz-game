import { vue, js, ts, git, sharp } from './images';

import { QuizCard } from '../models/models';

interface Link {
  id: number;
  title: string;
  to: string;
}

interface Checkbox {
  id: string;
  label: string;
}

export const headerLinks: Link[] = [
  {
    id: 1,
    title: 'Главная',
    to: '/',
  },
];

export const checkboxArray: Checkbox[] = [
  {
    id: 'frontend',
    label: 'Frontend',
  },
  {
    id: 'backend',
    label: 'Backend',
  },
  {
    id: 'common',
    label: 'Общие инструменты',
  },
];

export const quizArray = reactive<QuizCard[]>([
  {
    id: 'vue',
    image: vue,
    title: 'Vue.js',
    type: 'frontend',
  },
  {
    id: 'js',
    image: js,
    title: 'JavaScript',
    type: 'common',
  },
  {
    id: 'ts',
    image: ts,
    title: 'TypeScript',
    type: 'common',
  },
  {
    id: 'git',
    image: git,
    title: 'Git',
    type: 'common',
  },
  {
    id: 'sharp',
    image: sharp,
    title: 'C#',
    type: 'backend',
  },
]);
