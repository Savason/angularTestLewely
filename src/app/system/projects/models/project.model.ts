export interface IProjectModel {
  name: string;
  workspaceId: string;
  description?: string;
}

export class ProjectModel implements IProjectModel {
  name: string;
  workspaceId: string;
  description?: string;


  constructor(name: string, workspaceId: string, description?: string) {
    this.name = name;
    this.workspaceId = workspaceId;
    this.description = description;

  }
}
