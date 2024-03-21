// Эта функция getConversations используется для получения списка разговоров
// из базы данных с использованием Prisma. Она также обращается к функции getCurrentUser,
// чтобы получить текущего пользователя и фильтрует разговоры, в которых участвует этот пользователь.
// В случае ошибки функция возвращает пустой массив.

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser(); // Получение текущего пользователя с помощью функции getCurrentUser

  if (!currentUser?.id) {
    // Если id текущего пользователя не существует
    return []; // Возвращается пустой массив
  }

  try {
    const conversations = await prisma.conversation.findMany({
      // Получение списка разговоров из базы данных Prisma
      orderBy: {
        lastMessageAt: "desc", // Сортировка по времени последнего сообщения в убывающем порядке
      },
      where: {
        userIds: {
          has: currentUser.id, // Поиск разговоров, в которых участвует текущий пользователь
        },
      },
      include: {
        users: true, // Включение информации о пользователях разговора
        messages: {
          // Включение информации о сообщениях разговора
          include: {
            sender: true, // Включение информации о отправителе сообщения
            seen: true, // Включение информации о прочтении сообщения
          },
        },
      },
    });

    return conversations; // Возвращается список разговоров
  } catch (error: any) {
    // Обработка ошибок
    return []; // Возвращается пустой массив в случае ошибки
  }
};

export default getConversations;
