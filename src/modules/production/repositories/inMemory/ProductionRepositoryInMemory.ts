import { Production } from '@modules/production/domain/Production'
import { RepositoryInMemory } from '@test/domain/RepositoryInMemory'

export class ProductionRepositoryInMemory extends RepositoryInMemory<Production> {}
