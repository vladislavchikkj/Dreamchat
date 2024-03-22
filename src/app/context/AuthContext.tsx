// Этот компонент AuthContext оборачивает свои дочерние элементы в SessionProvider,
// который предоставляет контекст для работы с аутентификацией в приложении на основе Next.js.
// Таким образом, все компоненты, вложенные в AuthContext, получают доступ к данным сеанса аутентификации,
// предоставляемым NextAuth.js через SessionProvider

"use client"; // Использовать клиентскую версию Next.js

import { SessionProvider } from "next-auth/react"; // Импорт компонента SessionProvider из библиотеки next-auth/react

export interface AuthContextProps {
  children: React.ReactNode; // Проп children, содержащий React-элементы
}

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>; // Возвращает SessionProvider с переданными дочерними элементами
}
