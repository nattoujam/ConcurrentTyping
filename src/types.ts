export type Target = {
  id: number
  word: string
  timeLimit: number
}

export type TargetQueue = {
  code: string
  name: string
  targetList: Array<Target>
}

export type RankupRewardType = 'skill' | 'queue'

export type RankupReward = {
  id: number
  code: string
  name: string
  description: string
  type: RankupRewardType
}

export type Status = 'play' | 'playing' | 'restart'
