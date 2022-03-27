import { Observable, of } from 'rxjs';

type ContextCallback<T> = (context?: Record<string, any>) => T | Observable<T>;

export interface EntityField {
  type: string;
  caption?: string | ContextCallback<string>;
  options?: string[] | ContextCallback<string[]>;
}

export interface EntityType {
  name: string;
  fields: Record<string, EntityField>;
}
