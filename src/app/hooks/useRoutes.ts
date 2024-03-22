// Этот пользовательский хук useRoutes используется для генерации массива маршрутов
// на основе текущего пути и состояния разговора. Каждый маршрут представлен объектом со следующими свойствами:

// label: Метка маршрута.
// href: Путь, на который указывает маршрут.
// icon: Иконка маршрута.
// active: Булево значение, указывающее, активен ли текущий маршрут.
// onClick: Функция, вызываемая при клике на маршрут (присутствует только для выхода из системы).

// Хук использует мемоизацию для оптимизации вычислений, чтобы избежать лишних пересчетов при изменении зависимостей.

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";

const useRoutes = () => {
  // Объявление пользовательского хука useRoutes
  const pathname = usePathname(); // Получение текущего пути с помощью хука usePathname
  const { conversationId } = useConversation(); // Получение идентификатора разговора с помощью пользовательского хука useConversation

  const routes = useMemo(
    () => [
      // Создание мемоизированного массива маршрутов
      {
        label: "Chat", // Метка "Чат"
        href: "/conversations", // Путь к странице с разговорами
        icon: HiChat, // Иконка чата
        active: pathname === "/conversations" || !!conversationId, // Активен, если текущий путь - страница с разговорами, либо существует идентификатор разговора
      },
      {
        label: "Users", // Метка "Пользователи"
        href: "/users", // Путь к странице с пользователями
        icon: HiUsers, // Иконка пользователя
        active: pathname === "/users", // Активен, если текущий путь - страница с пользователями
      },
      {
        label: "Logout", // Метка "Выйти"
        onClick: () => signOut(), // Обработчик клика - функция выхода из системы
        href: "#", // Пустой хэш, так как ссылка не требуется для выхода из системы
        icon: HiArrowLeftOnRectangle, // Иконка выхода из системы
      },
    ],
    [pathname, conversationId]
  ); // Зависимости от текущего пути и идентификатора разговора

  return routes; // Возвращение мемоизированного массива маршрутов
};

export default useRoutes; // Экспорт пользовательского хука useRoutes
