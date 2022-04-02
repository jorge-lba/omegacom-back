export interface Repository<Entity> {
  findById(entityId: string): Promise<Entity>
  exists(entityId: string): Promise<boolean>
  save(entity: Entity): Promise<Entity>
}
