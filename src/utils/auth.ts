/**
 * Interfaces e tipos para gerenciamento de sessão e usuário
 */

// Representa um usuário do sistema
export interface IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: "Admin" | "User" | string;
  [k: string]: any;
}

// Representa a sessão armazenada
export interface ISession {
  token: string;
  refreshToken?: string;
  user: IUser;
  expiresAt: number;
}

// Chave usada no localStorage para salvar a sessão
const SESSION_KEY = "app_session_v1";

/**
 * Salva a sessão completa no localStorage
 * @param session
 */
export function saveSession(session: ISession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Recupera a sessão completa do localStorage
 * @returns ISession ou null se não existir
 */
export function getSession(): ISession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ISession;
  } catch {
    return null; // Em caso de JSON inválido
  }
}

/** Remove a sessão do localStorage (logout) */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/* --- Helpers para acessar propriedades individuais da sessão --- */

/** Retorna o usuário da sessão atual ou null se não existir */
export function getUser(): IUser | null {
  return getSession()?.user ?? null;
}

/** Retorna o token da sessão atual ou null se não existir */
export function getToken(): string | null {
  return getSession()?.token ?? null;
}

/** Retorna o refreshToken da sessão atual ou null se não existir */
export function getRefreshToken(): string | null {
  return getSession()?.refreshToken ?? null;
}

/** Retorna o timestamp de expiração da sessão ou null se não existir */
export function getExpiresAt(): number | null {
  return getSession()?.expiresAt ?? null;
}

/* --- Funções de gerenciamento de sessão --- */

/**
 * Verifica se a sessão expirou
 * @returns true se não houver sessão ou se expiresAt já passou
 */
export function isSessionExpired(): boolean {
  const expires = getExpiresAt();
  if (!expires) return true; // Sem sessão → expirada
  return Date.now() >= expires; // Compara timestamp atual com expiresAt
}

/**
 * Estende/atualiza a sessão com um novo token
 * Usado após refreshToken para renovar sessão
 * @param token Novo token de acesso
 * @param refreshToken Opcional novo refreshToken
 */
export function extendSessionWithNewToken(
  token: string,
  refreshToken?: string
): void {
  const session = getSession();
  if (!session) return;

  const newSession: ISession = {
    ...session, // mantém dados antigos
    token,
    refreshToken: refreshToken ?? session.refreshToken,
    expiresAt: Date.now() + 10 * 60 * 1000, // renova por +10 minutos
  };

  saveSession(newSession);
}

/**
 * Atualiza parcialmente a sessão
 * Permite modificar apenas campos específicos sem sobrescrever toda a sessão
 * @param partial Objeto com campos a atualizar
 */
export function updateSession(partial: Partial<ISession>): void {
  const session = getSession();
  if (!session) return;
  const merged = { ...session, ...partial };
  saveSession(merged);
}
