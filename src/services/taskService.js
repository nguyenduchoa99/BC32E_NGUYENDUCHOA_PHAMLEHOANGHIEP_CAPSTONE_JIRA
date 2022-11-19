import { api } from "../constants/api";

const taskService = {
    getProjectDetail: (taskId) => {
        return api.get('Project/getProjectDetail', {
            params: {
                id: taskId
            }
        });
    },
    createTask: (values) => {
        return api.post('Project/createTask', { ...values });
    },
    getAll: () => {
        return api.get('Status/getAll');
    },
    getAllpri: (projectId) => {
        return api.get('Priority/getAll', {
            params: {
                id: projectId
            }
        });
    },
    getAlltas: () => {
        return api.get('TaskType/getAll');
    },
    removeTask: (taskId) => {
        return api.delete('Project/removeTask', {
            params: {
                taskId: taskId
            }
        });
    },
    getTaskDetail: (taskId) => {
        return api.get('Project/getTaskDetail', {
            params: {
                taskId: taskId
            }
        });
    },
    updateTask: (values) => {
        return api.post('Project/updateTask', { ...values });
    },
    getAllComment: (taskId) => {
        return api.get('Comment/getAll', {
            params: {
                taskId: taskId
            }
        });
    },
    insertComment: (values) => {
        return api.post('Comment/insertComment', { ...values });
    },
    deleteComment: (commnetId) => {
        return api.delete('Comment/deteleComment', {
            params: {
                idComment: commnetId
            }
        });
    },
    updateComment: (commnetId, comment) => {
        return api.put(`Comment/updateComment`, { contentComment: comment }, {
            params: {
                id: commnetId,
                contentComment: comment
            },
        });
    },
};
export default taskService;