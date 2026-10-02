import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor' | 'orders' | 'instructor' | 'customer'
const has = (user: unknown, roles: Role[]) =>
  !!user && roles.includes(((user as { role?: Role }).role ?? 'customer') as Role)

export const anyone: Access = () => true
export const isAdmin: Access = ({ req }) => has(req.user, ['admin'])
export const isStaff: Access = ({ req }) => has(req.user, ['admin', 'editor'])
export const canHandleOrders: Access = ({ req }) => has(req.user, ['admin', 'orders'])
export const adminField: FieldAccess = ({ req }) => has(req.user, ['admin'])
/** Published docs for the public, everything for staff. */
export const publishedOrStaff: Access = ({ req }) =>
  has(req.user, ['admin', 'editor']) ? true : { published: { equals: true } }
