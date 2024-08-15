import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCorousel from "../../components/authCorousel/authCorousel";
import React from "react";

const Register = () => {
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        message.success("User registered successfully!");
        form.resetFields();
      } else {
        message.error("Registration failed!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed!");
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" form={form} onFinish={handleRegister}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "E-mail is required!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Password Again"
              name="passwordAgain"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: "Password Again is required!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have an account?&nbsp;
            <Link to="/login" className="text-blue-600">
              Now Login
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="h-full px-6">
                <AuthCorousel
                  img="https://proweb365.com/wp-content/themes/proweb365/assets/images/website-design/twin-responsive-website-design.svg"
                  title="Responsive"
                  desc="Compatibility with All Device Sizes"
                />
                <AuthCorousel
                  img="https://cdni.iconscout.com/illustration/premium/thumb/statistics-3465525-2923556.png?f=webp"
                  title="Statistics"
                  desc="Extended Statistics"
                />
                <AuthCorousel
                  img="https://ip1survey.com/assets/img/customer-satisfaction-index.svg"
                  title="Customer Satisfaction"
                  desc="Customers Satisfied with the Product at the End of the Experience"
                />
                <AuthCorousel
                  img="https://www.dmedaidpharma.com/login/svg/admin-img.svg"
                  title="Management Panel"
                  desc="One-Stop Management"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
