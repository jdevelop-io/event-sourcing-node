import { UserAdminAuthorizationInterface } from '@/product'

interface Config {
  admin: boolean
}

export class InMemoryUserAdminAuthorization implements UserAdminAuthorizationInterface {
  private readonly _isAdmin: boolean

  public constructor({ admin }: Config) {
    this._isAdmin = admin
  }

  public async check(): Promise<boolean> {
    return this._isAdmin
  }
}
