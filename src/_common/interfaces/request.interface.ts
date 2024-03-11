import { IPayload } from '../jwt/types/payload.interface';
import { Request } from 'express';

export interface IRequest extends Request {
  member: IPayload;
}
