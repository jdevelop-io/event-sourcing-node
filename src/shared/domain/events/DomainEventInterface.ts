import { Version } from '@/shared'

export interface DomainEventInterface {
  get version(): Version
  withVersion(version: Version): this
}
