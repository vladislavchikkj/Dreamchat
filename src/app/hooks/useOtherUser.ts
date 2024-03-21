// Этот пользовательский хук useOtherUser используется для получения другого
// пользователя из разговора на основе текущего пользователя из сессии.
// Он фильтрует пользователей разговора, чтобы исключить текущего пользователя и возвращает другого пользователя.

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  // Объявление пользовательского хука useOtherUser с параметром conversation
  const session = useSession(); // Получение текущей сессии пользователя с помощью хука useSession

  const otherUser = useMemo(() => {
    // Использование useMemo для мемоизации
    const currentUserEmail = session.data?.user?.email; // Получение email текущего пользователя из сессии

    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    ); // Фильтрация пользователей разговора для получения другого пользователя

    return otherUser[0]; // Возвращение первого элемента массива других пользователей
  }, [session.data?.user?.email, conversation.users]); // Зависимости от email текущего пользователя и пользователей разговора

  return otherUser; // Возвращение другого пользователя
};

export default useOtherUser;
