// Этот компонент ConversationList представляет собой боковую панель для списка разговоров.
// Он принимает начальные элементы списка разговоров и отображает их, используя компонент
// ConversationBox. Состояние isOpen определяет, отображается ли боковая панель,
// а conversationId указывает на выбранный разговор.

"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import GroupChatModal from "@/components/modals/GroupChatModal";
import clsx from "clsx";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems, // Начальные элементы списка разговоров
  users,
}) => {
  const [items, setItems] = useState(initialItems); // Состояние для элементов списка разговоров и функция для их обновления
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter(); // Получение объекта router с помощью хука useRouter

  const { conversationId, isOpen } = useConversation(); // Получение идентификатора разговора и состояния открытости разговора с помощью пользовательского хука useConversation

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside // Боковая панель для списка разговоров
        className={clsx(
          // Применение классов к боковой панели с помощью функции clsx
          `
            fixed 
            inset-y-0 
            pb-20
            lg:pb-0
            lg:left-20 
            lg:w-80 
            lg:block
            overflow-y-auto 
            border-r 
            border-gray-200 
          `,
          isOpen ? "hidden" : "block w-full left-0" // Условное применение классов в зависимости от состояния открытости разговора
        )}>
        <div className="px-5">
          {/* Контейнер для содержимого боковой панели */}
          <div className="flex justify-between mb-4 pt-4">
            {/* Верхняя часть боковой панели */}
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            {/* Заголовок раздела сообщений */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="
              rounded-full 
              p-2 
              bg-gray-100 
              text-gray-600 
              cursor-pointer 
              hover:opacity-75 
              transition
            ">
              <MdOutlineGroupAdd size={20} /> {/* Иконка добавления группы */}
            </div>
          </div>
          {items.map(
            (
              item // Отображение элементов списка разговоров с помощью компонента ConversationBox
            ) => (
              <ConversationBox
                key={item.id} // Использование id в качестве ключа, чтобы обеспечить уникальность
                data={item} // Передача данных разговора в компонент ConversationBox
                selected={conversationId === item.id} // Установка флага выбранного разговора
              />
            )
          )}
        </div>
      </aside>
    </>
  );
};

export default ConversationList; // Экспорт компонента ConversationList
