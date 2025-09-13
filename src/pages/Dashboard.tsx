import React from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import UserTable from "../components/UserTable";

const { Content } = Layout;

/**
 * Dashboard
 *
 * Este componente representa a página principal após o login.
 * Ele organiza o layout com cabeçalho e conteúdo principal,
 * exibindo a tabela de usuários.
 */
const Dashboard: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    {/* Cabeçalho fixo no topo */}
    <Header />

    {/* Área principal de conteúdo */}
    <Content style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      {/* Tabela de usuários com CRUD */}
      <UserTable />
    </Content>
  </Layout>
);

export default Dashboard;
