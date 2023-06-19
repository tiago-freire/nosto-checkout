import { ForbiddenError, Service, ServiceContext, method } from '@vtex/api'

export default new Service({
  routes: {
    settings: method({
      GET: async (context: ServiceContext) => {
        let response = ''
        try {
          response = await context.clients.apps.getAppSettings(
            process.env.VTEX_APP_ID ?? ''
          )
        } catch (error) {
          throw new ForbiddenError(
            `Error getting app settings: ${error.message}`
          )
        }

        context.body = response
        context.status = 200
        context.set('Access-Control-Allow-Origin', '*')
        context.set('cache-control', 'no-cache')
        context.set('Content-Type', 'application/json')
      },
    }),
  },
})
