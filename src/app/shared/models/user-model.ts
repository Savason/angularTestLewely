export interface IUserModel {
  username: string;
  name: string;
  systemRole: string;
  teamRole: string;
  password: string;
  id?: string;
}

export class UserModel implements IUserModel {
  username: string;
  name: string;
  systemRole: string;
  teamRole: string;
  password: string;
  id?: string;


  constructor(username: string, name: string, systemRole: string, teamRole: string, password: string, id?: string) {
    this.username = username;
    this.name = name;
    this.systemRole = systemRole;
    this.teamRole = teamRole;
    this.password = password;
    this.id = id;
  }
}
