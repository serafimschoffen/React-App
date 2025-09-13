// src/pages/UserTable.tsx

import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { getUser } from "../utils/auth";
import UserModalForm from "./UserModalForm";

// Interface de tipagem para os usuários
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "Admin" | "User" | string;
}

/**
 * Tabela de usuários:
 * - Lista usuários vindos da API
 * - Permite criação, edição e exclusão de registros
 * - Admin pode criar/editar/excluir, User apenas visualizar
 */
const UserTable: React.FC = () => {
  // Estado com a lista de usuários
  const [users, setUsers] = useState<IUser[]>([]);
  // Estado de loading (spinner na tabela)
  const [loading, setLoading] = useState(false);
  // Estado do modal (aberto/fechado)
  const [modalOpen, setModalOpen] = useState(false);
  // Usuário em edição (null quando é criação)
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const navigate = useNavigate();
  const me = getUser(); // Usuário logado (para permissões)

  /**
   * Busca os usuários da API
   * - Admin vê todos
   * - User só vê outros com role "User"
   */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ users: IUser[] }>("/users");
      let list = res.data.users ?? [];
      if (me?.role === "User") {
        list = list.filter((u) => u.role === "User");
      }
      setUsers(list);
    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  // Carrega a lista ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Exclui usuário pelo ID
   * - Remove do backend
   * - Atualiza a lista local
   */
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      message.success("Usuário excluído com sucesso!");
      setUsers((prev) => prev.filter((u) => u.id !== id)); // atualização otimista
    } catch (err) {
      console.error(err);
      message.error("Erro ao excluir usuário");
    }
  };

  /**
   * Abre modal para edição de um usuário existente
   */
  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  /**
   * Abre modal para criação de um novo usuário
   */
  const handleCreate = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  // Configuração das colunas da tabela
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Nome", render: (u: IUser) => `${u.firstName} ${u.lastName}` },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
    {
      title: "Ações",
      render: (u: IUser) => (
        <Space>
          {/* Detalhes acessível para todos */}
          <Button onClick={() => navigate(`/users/${u.id}`)}>Detalhes</Button>

          {/* Somente Admin pode editar e excluir */}
          {me?.role === "Admin" && (
            <>
              <Button onClick={() => handleEdit(u)}>Editar</Button>
              <Popconfirm
                title="Confirma exclusão?"
                onConfirm={() => handleDelete(u.id)}
              >
                <Button danger>Excluir</Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Botão de criar usuário (somente Admin) */}
      {me?.role === "Admin" && (
        <div style={{ marginBottom: 12 }}>
          <Button type="primary" onClick={handleCreate}>
            Criar Usuário
          </Button>
        </div>
      )}

      {/* Tabela de usuários */}
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Modal para criação/edição de usuários */}
      <UserModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchUsers} // atualiza tabela após criar/editar
        user={editingUser || undefined}
      />
    </>
  );
};

export default UserTable;
