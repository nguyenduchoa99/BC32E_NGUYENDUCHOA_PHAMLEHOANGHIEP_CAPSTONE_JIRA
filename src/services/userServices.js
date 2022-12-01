import api from "../constants/api";
const userServices = {
    getAllUser: () => {
        return api.get("Users/getUser");
    },
    deleteUserApi: (userId, acces) => {
        return api.delete("Users/deleteUser", {
            headers: {
                Authorization: `Bearer ${acces}`,
            },
            params: {
                id: userId,
            },
        });
    },
    createUserApi: (values) => {
        return api.post("Users/signup", values);
    },
    getAllUserdetailz: (userId) => {
        console.log(userId);
        return api.get(`Users/getUser?userId=${userId}`);
    },
    updateUserApi: (values) => {
        console.log(values);
        return api.put("Users/editUser", {
            ...values,
        });
    },
};
export default userServices;
