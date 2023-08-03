import { ResolverError, Service, ServiceContext, method } from '@vtex/api'

export default new Service({
  routes: {
    settings: method({
      GET: async (context: ServiceContext) => {
        const {
          clients: { apps },
        } = context

        const response = await apps
          .getAppSettings(process.env.VTEX_APP_ID ?? '')
          .catch((error) => {
            throw new ResolverError(
              `Error getting app settings: ${error.message}`
            )
          })

        context.set('Access-Control-Allow-Credentials', 'true')
        context.set('Access-Control-Allow-Origin', '*')
        context.set('Access-Control-Allow-Headers', '*')
        context.set('Access-Control-Allow-Methods', '*')
        context.set('cache-control', 'no-cache')
        context.set('Content-Type', 'application/json')
        context.status = 200
        context.body = response
      },
    }),
  },
})
