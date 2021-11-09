export interface IUser {
  id?: string;
  name: string;
  tag: string;
  password?: string;
  createdAt?: string;
  profile?: IProfile;
}

export interface IProfile {
  bio?: string;
}
