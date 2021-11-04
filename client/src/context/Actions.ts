import { IUser } from "../types/IUser";

export enum ActionType {
  LoginStart,
  LoginSuccess,
  LoginFailure,
  Logout,
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
}

export interface LoginStart {
  type: ActionType.LoginStart;
}

export interface LoginSuccess {
  type: ActionType.LoginSuccess;
  payload: IUser;
}

export interface LoginFailure {
  type: ActionType.LoginFailure;
}

export interface Logout {
  type: ActionType.Logout;
}

//update user

export interface UpdateStart {
  type: ActionType.UpdateStart;
}

export interface UpdateSuccess {
  type: ActionType.UpdateSuccess;
  payload: IUser;
}

export interface UpdateFailure {
  type: ActionType.UpdateFailure;
}

export type theActions =
  | LoginStart
  | LoginSuccess
  | LoginFailure
  | Logout
  | UpdateStart
  | UpdateSuccess
  | UpdateFailure;
