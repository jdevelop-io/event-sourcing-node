import { Version } from '@/shared'

export interface DomainEventInterface {
  name: string
  get version(): Version
  withVersion(version: Version): this
}
