export interface IUser {
  id?: string;
  name: string;
  tag: string;
  password?: string;
  profile?: IProfile;
}

export interface IProfile {
  bio?: string;
}
