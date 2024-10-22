import type { RankupReward, Target, TargetQueue } from '@/types'

export const TEST_TARGETS: Array<Target> = [
  { id: 1, word: 'example', timeLimit: 15000 },
  { id: 2, word: 'please', timeLimit: 15000 },
  { id: 3, word: 'typing', timeLimit: 15000 },
  { id: 4, word: 'octopus', timeLimit: 15000 },
  { id: 5, word: 'shark', timeLimit: 15000 },
]

export const TEST_QUEUE: TargetQueue = {
  code: 'test_queue',
  name: 'test',
  targetList: TEST_TARGETS,
}

export const ANIMAL_TARGETS: Array<Target> = [
  { id: 1, word: 'dog', timeLimit: 15000 },
  { id: 2, word: 'cat', timeLimit: 15000 },
  { id: 3, word: 'pig', timeLimit: 15000 },
  { id: 4, word: 'cow', timeLimit: 15000 },
  { id: 5, word: 'sheep', timeLimit: 15000 },
]

export const ANIMAL_QUEUE: TargetQueue = {
  code: 'animal_queue',
  name: 'animal',
  targetList: ANIMAL_TARGETS,
}

export const VEGITABLE_TARGETS: Array<Target> = [
  { id: 1, word: 'potato', timeLimit: 15000 },
  { id: 2, word: 'egg', timeLimit: 15000 },
  { id: 3, word: 'carrot', timeLimit: 15000 },
  { id: 4, word: 'cabbege', timeLimit: 15000 },
  { id: 5, word: 'onion', timeLimit: 15000 },
]

export const VEGITABLE_QUEUE: TargetQueue = {
  code: 'vegitable_queue',
  name: 'vegitable',
  targetList: VEGITABLE_TARGETS,
}

export const FRUIT_TARGETS: Array<Target> = [
  { id: 1, word: 'apple', timeLimit: 15000 },
  { id: 2, word: 'orange', timeLimit: 15000 },
  { id: 3, word: 'peach', timeLimit: 15000 },
  { id: 4, word: 'melon', timeLimit: 15000 },
  { id: 5, word: 'strawberry', timeLimit: 15000 },
]

export const FRUIT_QUEUE: TargetQueue = {
  code: 'fruit_queue',
  name: 'fruit',
  targetList: FRUIT_TARGETS,
}

export const TARGET_QUEUES: Array<TargetQueue> = [
  TEST_QUEUE,
  ANIMAL_QUEUE,
  VEGITABLE_QUEUE,
  FRUIT_QUEUE,
]

export const findTargetQueue = (code: string): TargetQueue | undefined => {
  return TARGET_QUEUES.find((queue: TargetQueue) => queue.code === code)
}

export const CHOICES: Array<RankupReward> = [
  {
    id: 1,
    code: 'animal_queue',
    name: ANIMAL_QUEUE.name,
    description: 'animal queue',
    type: 'queue',
  },
  {
    id: 2,
    code: 'vegitable_queue',
    name: VEGITABLE_QUEUE.name,
    description: 'vegitable queue',
    type: 'queue',
  },
  {
    id: 3,
    code: 'fruit_queue',
    name: FRUIT_QUEUE.name,
    description: 'fruit queue',
    type: 'queue',
  },
]
