import { Form, Input } from 'antd'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registers } from '../../../../store/authReducer/authReducer';
import './register.scss'


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
        },
        mode: "onTouched",
    });
    const onSubmit = async (values) => {
        try {
            await dispatch(registers(values)).unwrap();
            navigate('/login');
            Swal.fire({
                icon: 'success',
                title: "Đăng ký thành công",
            })
        }
        catch (err) {
            Swal.fire({
                icon: "error",
                title: 'Đăng ký thất bại',
                text: err.message
            })
        }
        
    }
    return (
        <div className="register">
            <h1 className="register-title text-[30px] text-center font-bold">Đăng Ký</h1>

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
                            message: "Email không được để trống",
                        },
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email không đúng định dạng",
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Email"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input type="text" {...field} placeholder="Email" />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Mật khẩu không được để trống",
                        },
                        minLength: {
                            value: 6,
                            message: "Mật khẩu phải từ 6 đến 16 ký tự",
                        },
                        maxLength: {
                            value: 16,
                            message: "Mật khẩu phải từ 6 đến 16 ký tự",
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Mật Khẩu"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input.Password
                                type="password"
                                {...field}
                                placeholder="Mật Khẩu"
                            />
                        </Form.Item>
                    )}
                />



                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Họ tên không được để trống",
                        },
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Họ Tên"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input type="text" {...field} placeholder="Họ Tên" />
                        </Form.Item>
                    )}
                />

                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Số điện thoại không được để trống",
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Số điện thoại không đúng định dạng"
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Form.Item
                            label="Số Điện Thoại"
                            validateStatus={error ? "error" : ""}
                            help={error?.message}
                        >
                            <Input type="text" {...field} placeholder="Số Điện Thoại" />
                        </Form.Item>
                    )}
                />
                <Form.Item>
                    <button
                        className='reg-btn'
                    >
                        Đăng Ký
                    </button>
                    <div>
                        <p className="text-center ">Bạn đã có tài khoản? <NavLink className='text-title-reg' to="/login">Đăng nhập ngay!</NavLink> </p>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register