"use client";

import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullConversationType } from "@/app/types";
import GroupChatModal from "@/components/modals/GroupChatModal";
import ConversationBox from "./ConversationBox";

// Props для компонента ConversationList
interface ConversationListProps {
  initialItems: FullConversationType[]; // Начальные элементы бесед
  users: User[]; // Пользователи
  title?: string; // Заголовок (необязательный)
}

// Компонент ConversationList
const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  // Состояния для списка элементов бесед и модального окна
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Хуки для маршрута и сессии
  const router = useRouter();
  const session = useSession();

  // Получение данных о беседе с помощью пользовательского хука useConversation
  const { conversationId, isOpen } = useConversation();

  // Вычисление ключа Pusher для подписки
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  // Эффект для подписки на обновления бесед от Pusher
  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    // Привязка обработчиков событий Pusher для обновления, новой беседы и удаления
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    // Отписка от Pusher при размонтировании компонента или изменении маршрута
    return () => {
      pusherClient.unsubscribe(pusherKey);
    };
  }, [pusherKey, router]);

  return (
    <>
      {/* Модальное окно для создания групповой беседы */}
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Боковая панель для отображения списка бесед */}
      <aside
        className={clsx(
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
          isOpen ? "hidden" : "block w-full left-0"
        )}>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
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
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {/* Отображение списка бесед */}
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
