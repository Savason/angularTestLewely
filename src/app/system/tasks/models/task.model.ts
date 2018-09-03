export interface ITaskModel {
  name: string;
  projectId: string;
  description?: string;
}

export class TaskModel implements ITaskModel {
  name: string;
  projectId: string;
  description?: string;


  constructor(name: string, projectId: string, description?: string) {
    this.name = name;
    this.projectId = projectId;
    this.description = description;

  }
}
