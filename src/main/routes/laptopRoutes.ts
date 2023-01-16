import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import { makeGetSortedLenovoLaptopsController } from '@/main//factories/controllers/getSortedLenovoLaptopsController'

export default async (router: Router): Promise<void> => {
  router.get('/puppeteer/', adaptRoute(await makeGetSortedLenovoLaptopsController('puppeteer')))
  router.get('/playwright/', adaptRoute(await makeGetSortedLenovoLaptopsController('playwright')))
}
