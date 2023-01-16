declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      CLIENT_ID: string
      PERMISSIONS: number
      SCOPE: string
      TOKEN: string
    }
  }
}

export {}
