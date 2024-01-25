import { EventTypes } from '../enum/event-types.enum';

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}