interface TaskMember {
  [key: string]: {
    id: number | string;
  };
}

class Task {
  private tasks: TaskMember = {};

  getTasks = () => {
    return this.tasks;
  };

  getTask = (key: string) => this.tasks[key];

  setTask = (key: string, value: { id: number | string }) => (this.tasks[key] = value);

  deleteTask = (key: string) => delete this.tasks[key];
}

export default new Task();
