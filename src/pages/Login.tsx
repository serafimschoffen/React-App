import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import api from "../utils/api";
import { saveSession } from "../utils/auth";

// Interface para tipar os valores do formulário de login
interface LoginValues {
  username: string;
  password: string;
}

/**
 * Login
 *
 * Componente responsável por autenticar o usuário no sistema.
 * - Exibe formulário de login com username e senha
 * - Valida dados no backend
 * - Salva sessão e redireciona para o dashboard
 */
const Login: React.FC = () => {
  const navigate = useNavigate();

  /**
   * onFinish
   * Executado ao submeter o formulário de login.
   * - Faz requisição à API de autenticação
   * - Normaliza os dados do usuário
   * - Define a role do usuário (Admin/User)
   * - Salva sessão no localStorage
   * - Redireciona para o dashboard
   */
  const onFinish = async (values: LoginValues) => {
    try {
      // Requisição de login
      const res = await api.post("/auth/login", values);
      const data = res.data;

      // Normalizar dados do usuário vindos da API
      const userFromApi = data.user ?? {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };

      // Determinar role do usuário (Admin ou User)
      const role =
        (data.role as string | undefined) ??
        (userFromApi.role as string | undefined) ??
        // Fallback: usuários específicos definidos como Admin
        (["emilys"].includes(userFromApi.username) ? "Admin" : "User");

      // Validação: role inválida
      if (role !== "Admin" && role !== "User") {
        message.error("Usuário não cadastrado no sistema");
        return;
      }

      // Monta objeto final do usuário
      const user = { ...userFromApi, role };

      // Salva sessão com tempo de expiração de 10 minutos
      saveSession({
        token: data.token,
        refreshToken: data.refreshToken,
        user,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      message.success("Login realizado com sucesso!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // Trata erro de autenticação
      console.error("Erro no login:", err);
      message.error("Usuário ou senha inválidos!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>

      {/* Formulário de autenticação */}
      <Form layout="vertical" onFinish={onFinish}>
        {/* Campo: Username */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Informe seu username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        {/* Campo: Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Informe sua senha" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Botão de submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
