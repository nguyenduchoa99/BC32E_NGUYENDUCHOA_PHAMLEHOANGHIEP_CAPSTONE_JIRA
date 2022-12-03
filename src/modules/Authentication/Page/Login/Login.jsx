import React from 'react'
import {Form,Input} from 'antd'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './login.scss'
import { login } from '../../../../store/authReducer/authReducer';
import Swal from 'sweetalert2';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });
    const onSubmit = async (values) => {
        try {
            await dispatch(login(values)).unwrap();
            navigate('/listProject');
            Swal.fire({
                icon: 'success',
                title: "Đăng nhập thành công",
            })
        }
        catch (err) {
            Swal.fire({
                icon: 'error',
                title: "Đăng nhập thất bại",
                text: err.message
            })
        }
    }
    if (user) {
        return <Navigate to='/' />
    }
    return (
        <div className="login">
            <h1 className="login-title text-[30px] text-center font-bold">Đăng nhập</h1>
            <Form
                onFinish={handleSubmit(onSubmit)}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Vui lòng nhập tài khoản",
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Email"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input type="text" placeholder='Email' {...field} />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Vui lòng nhập mật khẩu",
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Mật Khẩu"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input.Password type="password" placeholder='Mật khẩu'{...field} />
                        </Form.Item>
                    )}
                />

                <Form.Item>
                    <button
                        className='log-btn'
                    >
                        Đăng Nhập
                    </button>
                    <div>
                        <p className="text-center">Bạn chưa có tài khoản? <NavLink className='text-title-log' to="/register">Đăng ký ngay!</NavLink></p>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login