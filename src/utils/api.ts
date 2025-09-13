// Importa a biblioteca Axios para requisições HTTP
import axios from "axios";

// Importa funções utilitárias de autenticação/sessão
import {
  getToken,
  getRefreshToken,
  isSessionExpired,
  extendSessionWithNewToken,
  clearSession,
} from "./auth";

// Cria uma instância Axios com a URL base da API
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

/**
 * Interceptor de requisições
 *
 * - Adiciona o token JWT no cabeçalho Authorization de todas as requisições
 * - Verifica se a sessão expirou
 * - Tenta renovar o token usando refreshToken se disponível
 * - Se a renovação falhar ou não houver refreshToken, força logout
 */
api.interceptors.request.use(async (config) => {
  const token = getToken(); // Pega token atual da sessão

  if (token) {
    // Se a sessão estiver expirada
    if (isSessionExpired()) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Tenta renovar token via endpoint de refresh
          const res = await axios.post("https://dummyjson.com/auth/refresh", {
            refreshToken,
          });

          // Atualiza a sessão com o novo token e refreshToken
          extendSessionWithNewToken(res.data.token, res.data.refreshToken);

          // Adiciona o token renovado ao cabeçalho da requisição
          config.headers.Authorization = `Bearer ${res.data.token}`;
        } catch (err) {
          // Se falhar, limpa sessão e redireciona para login
          console.error("Falha ao renovar sessão:", err);
          clearSession();
          window.location.href = "/login"; // força logout
        }
      } else {
        // Não há refreshToken disponível → logout
        clearSession();
        window.location.href = "/login";
      }
    } else {
      // Sessão ainda válida → adiciona token ao cabeçalho
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config; // Retorna a configuração da requisição para prosseguir
});

export default api;
