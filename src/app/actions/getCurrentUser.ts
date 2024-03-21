// Эта функция getCurrentUser используется для получения текущего пользователя из базы данных с
// использованием Prisma. Она также обращается к функции getSession, чтобы получить текущую сессию пользователя.
// В случае ошибки или отсутствия пользователя в базе данных функция возвращает null.

import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession(); // Получение текущей сессии пользователя

    if (!session?.user?.email) {
      // Если email пользователя не существует в сессии
      return null; // Возвращается null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string, // Использование email из сессии в качестве условия поиска
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;