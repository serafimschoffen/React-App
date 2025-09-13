import React from "react";
import { Button, Layout, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { clearSession, getUser } from "../utils/auth";

// Desestruturação do componente Header do Ant Design
const { Header: AntHeader } = Layout;

/**
 * Componente de cabeçalho da aplicação.
 * Exibe o nome do usuário logado e um botão para logout.
 */
const Header: React.FC = () => {
  // Recupera o usuário atual da sessão
  const user = getUser();

  // Hook para navegação programática entre rotas
  const navigate = useNavigate();

  /**
   * Função responsável por realizar o logout do usuário.
   * - Limpa os dados da sessão do localStorage
   * - Redireciona para a página de login
   */
  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    // Renderiza o cabeçalho com estilos personalizados
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529",
        padding: "0 20px",
      }}
    >
      {/* Exibe saudação com o nome do usuário ou texto padrão */}
      <div style={{ color: "#fff", fontWeight: "bold" }}>
        {user ? `Olá, ${user.username}` : "Sistema"}
      </div>

      {/* Área de ações do usuário: botão de logout */}
      <Space>
        <Button onClick={handleLogout} type="primary">
          Sair
        </Button>
      </Space>
    </AntHeader>
  );
};

// Exporta o componente Header para uso em outros arquivos
export default