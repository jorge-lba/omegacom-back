import { Repository } from '@core/domain/Repository'

export abstract class RepositoryInMemory<Entity> implements Repository<Entity> {
  private _entities: Map<string, Entity> = new Map()

  get entities () {
    return this._entities
  }

  async findById (entityId: string): Promise<Entity> {
    return await new Promise(resolve => resolve(this._entities.get(entityId)))
  }

  async exists (entityId: string): Promise<boolean> {
    return await new Promise(resolve =>
      resolve(
        !!this._entities.get(entityId)
      )
    )
  }

  async save (entity: Entity): Promise<Entity> {
    // @ts-ignore
    this._entities.set(entity.id, entity)
    return entity
  }
}

export namespace inMemory {
  export function getEntities (repository: Repository<any>) {
    // @ts-ignore
    return repository.entities
  }

  export function iteratorEntities (repository: Repository<any>) {
    return getEntities(repository).values()
  }

  export function entitiesIds (repository: Repository<any>) {
    return Array.from(iteratorEntities(repository)).map((entity: any) => entity.id)
  }
}
