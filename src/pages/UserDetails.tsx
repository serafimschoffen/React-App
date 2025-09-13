import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, message, Spin } from "antd";
import api from "../utils/api";

/**
 * UserDetails
 *
 * Componente responsável por exibir os detalhes de um usuário específico.
 * - Busca usuário pelo ID via API
 * - Exibe detalhes em um card estilizado
 * - Permite voltar para o Dashboard
 */
const UserDetails: React.FC = () => {
  // Obtém parâmetro `id` da URL (ex: /dashboard/users/:id)
  const { id } = useParams<{ id: string }>();

  // Hook de navegação para redirecionamentos
  const navigate = useNavigate();

  // Estado do usuário carregado
  const [user, setUser] = useState<any>(null);

  // Estado de loading para exibir spinner durante a requisição
  const [loading, setLoading] = useState(false);

  /**
   * useEffect
   * Dispara quando o `id` muda.
   * - Busca os dados do usuário pelo ID informado
   * - Atualiza estado `user` e `loading`
   */
  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      setLoading(true);
      try {
        // Requisição GET para buscar usuário
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
      } catch {
        message.error("Erro ao carregar detalhes do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <Spin tip="Carregando..." style={{ marginTop: 100 }} />;

  // Caso nenhum usuário seja encontrado
  if (!user) return <p>Nenhum usuário encontrado.</p>;

  return (
    <div style={{ padding: 24 }}>
      {/* Botão para voltar ao Dashboard */}
      <Button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: 16 }}
      >
        Voltar
      </Button>

      {/* Card com informações detalhadas do usuário */}
      <Card title={`Detalhes de ${user.username}`}>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Nome:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Telefone:</strong> {user.phone}
        </p>
        <p>
          <strong>Idade:</strong> {user.age}
        </p>
        <p>
          <strong>Gênero:</strong> {user.gender}
        </p>

        {/* Renderiza endereço apenas se existir */}
        {user.address && (
          <>
            <p>
              <strong>Endereço:</strong> {user.address.address}
            </p>
            <p>
              <strong>Cidade:</strong> {user.address.city}
            </p>
            <p>
              <strong>CEP:</strong> {user.address.postalCode}
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default UserDetails;
