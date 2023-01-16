import { Pause } from './pause'
import { Play } from './play'
import { Stop } from './stop'
import { Command } from './types'
import { Unpause } from './unpause'

export type { Command } from './types'

export const commands: Command[] = [Pause, Play, Stop, Unpause]
