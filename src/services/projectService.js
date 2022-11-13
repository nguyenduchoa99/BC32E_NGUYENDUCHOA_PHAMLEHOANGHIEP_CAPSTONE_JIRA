import { api } from '../constants/api'
const projectService = {
    getAllProjectCategory: () => {
        return api.get("ProjectCategory")
    },
    createProject: (values) => {
        return api.post("Project/createProject", { ...values })
    }
}
export default projectService;