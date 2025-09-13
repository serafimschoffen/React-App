import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import api from "../utils/api";
import type { IUser } from "../utils/auth";

interface UserModalFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: IUser, isEdit: boolean) => void; // agora retorna o usuário salvo
  user?: IUser; // se existir -> edição, senão -> criação
}

const { Option } = Select;

const UserModalForm: React.FC<UserModalFormProps> = ({
  open,
  onClose,
  onSuccess,
  user,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (user) {
        // edição
        const res = await api.put(`/users/${user.id}`, values);
        const updatedUser: IUser = { ...user, ...res.data };
        message.success("Usuário atualizado com sucesso!");
        onSuccess(updatedUser, true);
      } else {
        // criação
        const res = await api.post(`/users/add`, values);
        const newUser: IUser = {
          ...res.data,
          id: res.data.id ?? Math.floor(Math.random() * 1000000), // garante id
        };
        message.success("Usuário criado com sucesso!");
        onSuccess(newUser, false);
      }

      onClose();
    } catch (err: any) {
      if (err?.errorFields) {
        message.error("Preencha todos os campos obrigatórios.");
      } else {
        message.error("Erro ao salvar usuário.");
      }
    }
  };

  return (
    <Modal
      open={open}
      title={user ? "Editar Usuário" : "Criar Usuário"}
      okText={user ? "Salvar" : "Criar"}
      cancelText="Cancelar"
      onCancel={onClose}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="firstName" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Sobrenome"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select>
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
          </Select>
        </Form.Item>
        <Form.Item name="phone" label="Telefone">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Idade">
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModalForm;
