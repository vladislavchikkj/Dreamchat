// Эта функция getSession используется для получения серверной сессии с
// помощью getServerSession из пакета next-auth. Она экспортируется для
// использования в других частях приложения.

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[[...nextauth]]";

export default async function getSession() {
  return await getServerSession(authOptions); // Получение серверной сессии с помощью функции getServerSession и передача опций аутентификации
}
