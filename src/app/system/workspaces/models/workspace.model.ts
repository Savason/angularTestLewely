export interface IWorkspaceModel {
  name: string;
  id?: string;
}

export class WorkspaceModel implements IWorkspaceModel {
  name: string;
  id?: string;


  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id;
  }
}
