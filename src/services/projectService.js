import { api } from '../constants/api'
const projectService = {
    getAllProjectCategory: () => {
        return api.get("ProjectCategory")
    },
    createProjectAuthorize: (values) => {
        return api.post("Project/createProjectAuthorize", { ...values })
    }
}
export default projectService;