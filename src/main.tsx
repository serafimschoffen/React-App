import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { ConfigProvider, theme, Switch, Layout } from "antd";

const { Header, Content } = Layout;

/**
 * Componente raiz da aplicação.
 * Responsável por fornecer:
 *  - Tema global (claro/escuro)
 *  - Layout principal
 *  - Renderização do App
 */
const Root: React.FC = () => {
  // Estado para controlar tema dark/light
  const [isDark, setIsDark] = useState(false);

  return (
    // ConfigProvider do Ant Design permite customizar tema global
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm, // Alterna entre dark e default
        token: {
          colorPrimary: "#1677ff", // Cor primária do tema
        },
      }}
    >
      {/* Layout principal da aplicação */}
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header fixo com título e toggle de Dark Mode */}
        <Header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ color: "#fff", flex: 1, margin: 0 }}>Meu App</h1>
          <span style={{ color: "#fff" }}>Dark Mode</span>
          {/* Switch para alternar entre tema claro e escuro */}
          <Switch checked={isDark} onChange={setIsDark} />
        </Header>

        {/* Conteúdo principal */}
        <Content style={{ padding: 24 }}>
          <App /> {/* Renderiza todas as rotas e páginas da aplicação */}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

// Renderiza o componente Root dentro do elemento root do HTML
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
