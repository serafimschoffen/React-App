import api from "./utils/api";

async function testCreateUser() {
  try {
    const res = await api.post("/users/add", {
      firstName: "Maria",
      lastName: "Oliveira",
      age: 30,
      email: "maria.oliveira@example.com",
      username: "mariaoliveira",
      role: "Admin",
    });
    console.log("Usuário criado:", res.data);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
  }
}

testCreateUser();
