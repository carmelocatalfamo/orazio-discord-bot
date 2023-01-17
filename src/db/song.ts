import {
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import { sequelize } from '.'

interface SongModel
  extends Model<
    InferAttributes<SongModel>,
    InferCreationAttributes<SongModel>
  > {
  id: CreationOptional<number>
  url: string
  addedBy: string
  status: 'PLAYING' | 'QUEUEING'
}

export const Song = sequelize.define<SongModel>('song', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: DataTypes.STRING,
  addedBy: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: ['PLAYING', 'QUEUEING'],
  },
})

export const addSong = async ({
  url,
  addedBy,
  status,
}: CreationAttributes<SongModel>) =>
  await Song.create({
    url,
    addedBy,
    status,
  })

export const songIsPlaying = async (): Promise<boolean> => {
  const song = await Song.findOne({ where: { status: 'PLAYING' } })
  return !!song
}

export const removePlayingSong = async (): Promise<boolean> => {
  const song = await Song.findOne({ where: { status: 'PLAYING' } })

  if (!song) {
    return false
  }

  await song.destroy()
  return true
}

export const findNextSongToPlay =
  async (): Promise<InferAttributes<SongModel> | null> => {
    const song = await Song.findOne({
      where: { status: 'QUEUEING' },
      order: [['id', 'ASC']],
    })

    if (!song) {
      return null
    }

    return song.dataValues
  }

export const updateSongStatus = async ({
  id,
  status,
}: Pick<InferAttributes<SongModel>, 'id' | 'status'>): Promise<boolean> => {
  const song = await Song.findByPk(id)

  if (!song) {
    return false
  }

  await song.update({ status })
  return true
}

export const clearQueue = async () => await Song.destroy({ truncate: true })
