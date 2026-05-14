export const getPayloadClient = async () => {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import('payload'),
    import('@payload-config'),
  ])

  return getPayload({ config })
}
