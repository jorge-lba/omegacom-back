import { Uuid } from "../shared/Uuid";
import { DomainError } from "./errors/DomainError";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};


export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly _props: T;
  public readonly _errors: Map<string, DomainError> = new Map()

  constructor (props: T, id?: string) {
    this._id = id || Uuid.generate();
    this._props = props;
  }

  get id(){
    return this._id;
  }

  get props(){
    return this._props
  }

  get errors(){
    return this._errors;
  }

  protected includeNewError(error: DomainError){
    this._errors.set(error.id, error)
  }

  public equals (object?: Entity<T>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }

  public isValid(): boolean {
    return this._errors.size === 0
  }
}