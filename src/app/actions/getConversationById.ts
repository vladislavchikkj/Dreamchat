// Эта функция getConversationById используется для получения разговора из базы данных
// по его идентификатору с использованием Prisma. Она также обращается к функции getCurrentUser,
// чтобы получить текущего пользователя и проверить его email.
// В случае ошибки функция выводит сообщение об ошибке в консоль и возвращает null.

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId, // Условие поиска по идентификатору разговора
      },
      include: {
        users: true, // Включение информации о пользователях разговора
      },
    });

    return conversation; // Возвращается найденный разговор
  } catch (error: any) {
    console.log(error, "SERVER_ERROR");
    return null;
  }
};

export default getConversationById;
