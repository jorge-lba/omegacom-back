import { DomainEvents } from '@core/domain/events/DomainEvents'
import { IHandle } from '@core/domain/events/IHandle'
import { StartProductionEvent } from '@modules/production/domain/events/StartProductionEvent'

export class AfterStartProduction implements IHandle {
  constructor () {
    this.setupSubscriptions()
  }

  setupSubscriptions (): void {
    DomainEvents.register(
      // @ts-ignore
      this.onStartProductionEvent.bind(this),
      StartProductionEvent.name
    )
  }

  private async onStartProductionEvent (event: StartProductionEvent): Promise<void> {
    console.log('Start Event')
    console.log(event)
  }
}
