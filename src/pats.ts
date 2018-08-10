import { normalize, join } from 'path'

const path = (...parts) => normalize(join(__dirname, ...parts))

export const pathView = path('../views')
export const pathPublic = path('../public')
export const pathFavicon = path('../public/img/favicon.ico')
