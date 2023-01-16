import * as dotenv from 'dotenv'

dotenv.config()

const { CLIENT_ID, PERMISSIONS, SCOPE } = process.env

const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=${PERMISSIONS}&scope=${SCOPE}`

const textToPrint = `
#####################
### Here the link ###
#####################
${url}
`

console.log(textToPrint)
