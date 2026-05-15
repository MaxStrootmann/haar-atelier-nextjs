import type { Access, AccessArgs } from 'payload'

type Role = 'admin' | 'editor'

type UserWithRoles = {
  roles?: Role[] | null
}

const getUserRoles = (user: AccessArgs['req']['user']): Role[] => {
  const roles = (user as UserWithRoles | null | undefined)?.roles
  return Array.isArray(roles) ? roles : []
}

export const hasRole = (user: AccessArgs['req']['user'], allowedRoles: Role[]): boolean => {
  const roles = getUserRoles(user)
  return roles.some((role) => allowedRoles.includes(role))
}

export const admins: Access = ({ req: { user } }) => hasRole(user, ['admin'])

export const adminsOrEditors: Access = ({ req: { user } }) => hasRole(user, ['admin', 'editor'])
