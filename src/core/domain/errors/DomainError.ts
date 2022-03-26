import { Uuid } from "../../shared/Uuid"

export abstract class DomainError{
  private _id: string
  private _context: string
  private _date: Date
  private _message: string
  private _name: string
  
  constructor(props: DomainErrorProps) {
    this._id = Uuid.generate()
    this._name = props.name
    this._message = props.message
    this._context = props.context
    this._date = new Date
  }

  get id(){
    return this._id
  }

  get context() {
    return this._context
  }

  get date() {
    return this._date
  }

  get message(){
    return this._message
  }

  get name(){
    return this._name
  }

  get values() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      context: this.context,
      date: this.date
    }
  }
}

export interface DomainErrorProps {
  name: string
  message: string
  context: string
}
