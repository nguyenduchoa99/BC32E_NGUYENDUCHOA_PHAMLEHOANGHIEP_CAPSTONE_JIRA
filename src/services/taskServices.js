import api from "../constants/api";
const taskServices
 = {
  getProjectDetail: (taskId, acces) => {
    return api.get("Project/getProjectDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: taskId,
      },
    });
  },
  createTask: (values, acces) => {
    return api.post("Project/createTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getAll: () => {
    return api.get("Status/getAll");
  },
  getAllpri: (projectId) => {
    return api.get("Priority/getAll", {
      params: {
        id: projectId,
      },
    });
  },
  getAlltas: () => {
    return api.get("TaskType/getAll");
  },
  createTask: (values, acces) => {
    return api.post("Project/createTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  removeTask: (taskId, acces) => {
    return api.delete("Project/removeTask", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        taskId: taskId,
      },
    });
  },
  getTaskDetail: (taskId, acces) => {
    return api.get("Project/getTaskDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        taskId: taskId,
      },
    });
  },
  updateTasks: (values, acces) => {
    return api.post("Project/updateTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getAllComment: (taskId) => {
    return api.get("Comment/getAll", {
      params: {
        taskId: taskId,
      },
    });
  },
  insertComment: (values, acces) => {
    return api.post("Comment/insertComment", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  deleteComment: (commentId, acces) => {
    return api.delete("Comment/deleteComment", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        idComment: commentId,
      },
    });
  },

  updateComment: (commentId, comment, acces) => {
    return api.put(
      `Comment/updateComment`,
      { contentComment: comment },
      {
        headers: {
          Authorization: `Bearer ${acces}`,
        },
        params: {
          id: commentId,
          contentComment: comment,
        },
      }
    );
  },
};
export default taskServices
;
