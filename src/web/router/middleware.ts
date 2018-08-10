import { Router, static as serverStatic } from 'express'
import { urlencoded, json } from 'body-parser'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import { pathFavicon, pathPublic } from '../../pats'

export const middlewareRouter = Router()

middlewareRouter.use(favicon(pathFavicon))
middlewareRouter.use(json())
middlewareRouter.use(urlencoded({ extended: true }))
middlewareRouter.use(cookieParser())
middlewareRouter.use(serverStatic(pathPublic))
