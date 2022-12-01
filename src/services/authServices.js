import api from "../constants/api";

const authServices = {
    registers: (values) => {
        return api.post("Users/signup", {
            ...values,
        });
    },
    login: (values) => {
        return api.post("Users/signin", values)
    }
};

export default authServices;
