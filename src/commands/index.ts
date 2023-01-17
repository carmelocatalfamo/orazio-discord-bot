import { compact } from 'lodash'

import { Debug } from './debug'
import { Pause } from './pause'
import { Play } from './play'
import { Skip } from './skip'
import { Stop } from './stop'
import { Command } from './types'
import { Unpause } from './unpause'

export type { Command } from './types'

export const commands: Command[] = compact([
  Pause,
  Play,
  Skip,
  Stop,
  Unpause,
  process.env.NODE_ENV === 'development' ? Debug : null,
])
