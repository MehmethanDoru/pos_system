import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthCorousel from "../../components/authCorousel/authCorousel";
import React from "react";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data)); 
        message.success("Login successful!");
        navigate("/"); 
      } else {
        message.error("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed!");
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" form={form} onFinish={handleLogin}>
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            You don't have an account?&nbsp;
            <Link to="/register" className="text-blue-600">
              Now Register
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

export default Login;
