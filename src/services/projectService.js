import { api } from '../constants/api';

const projectService = {
    getAllProjectCategory: () => {
        return api.get("ProjectCategory");
    },
    createProjectAuthorize: (values) => {
        return api.post("Project/createProjectAuthorize", { ...values });
    },
    getAllProject: () => {
        return api.get("Project/getAllProject", {});
    },
    getUser: () => {
        return api.get("Users/getUser", {})
    },
    deleteProject: (projectId) => {
        return api.delete("Project/deleteProject", {
            params: {
                projectId: projectId
            }
        });
    },
    getProjectDetail: (projectId) => {
        return api.get("Project/getProjectDetail", {
            params: {
                projectId: projectId
            }
        });
    },
    updateProject: (values) => {
        return api.put("Project/updateProject", { ...values });
    },
    assignUserProject: (values) => {
        return api.post("Project/assignUserProject", values);
    },
    removeUserProject: (values) => {
        return api.post("Project/removeUserFromProject", values);
    }
}
export default projectService;