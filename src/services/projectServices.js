import api from "../constants/api";

const projectServices = {
  getAllProject: (acces) => {
    return api.get("Project/getAllProject", {
    });
  },
  getUser: (acces) => {
    return api.get("Users/getUser", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  createProjectAuthorize: (values, acces) => {
    return api.post("Project/createProjectAuthorize", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  deleteProject: (projectId, acces) => {
    return api.delete("Project/deleteProject", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        projectId: projectId,
      },
    });
  },
  ProjectCategory: () => {
    return api.get("ProjectCategory");
  },
  getProjectDetail: (projectId, acces) => {
    return api.get("Project/getProjectDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: projectId,
      },
    });
  },
  updateProjects: (values, projectId, acces) => {
    return api.put("Project/updateProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        projectId: projectId,
      },
    });
  },
  assignUserProject: (values, acces) => {
    return api.post("Project/assignUserProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  removeUserProject: (values, acces) => {
    return api.post("Project/removeUserFromProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
};

export default projectServices;
