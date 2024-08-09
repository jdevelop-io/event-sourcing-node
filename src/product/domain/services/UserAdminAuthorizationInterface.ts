export interface UserAdminAuthorizationInterface {
  check(): Promise<boolean>
}
