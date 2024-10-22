import {
  ANIMAL_QUEUE,
  CHOICES,
  FRUIT_QUEUE,
  TEST_QUEUE,
  VEGITABLE_QUEUE,
} from '@/const'
import type { RankupReward, RankupRewardType, Target } from '@/types'

export const fetchRankupRewardList = (
  type: RankupRewardType,
  excludeCodeList: Array<string> = [],
): Array<RankupReward> => {
  if (type === 'queue')
    return CHOICES.filter(
      (reward: RankupReward) => !excludeCodeList.includes(reward.code),
    )
  else return []
}

export const fetchTargetList = (code: string): Array<Target> => {
  if (code === TEST_QUEUE.code) return TEST_QUEUE.targetList
  else if (code === ANIMAL_QUEUE.code) return ANIMAL_QUEUE.targetList
  else if (code === VEGITABLE_QUEUE.code) return VEGITABLE_QUEUE.targetList
  else if (code === FRUIT_QUEUE.code) return FRUIT_QUEUE.targetList
  else return []
}
