// Мы используем хуки useConversation и useRoutes, чтобы получить информацию о разговоре и маршрутах соответственно.
// Если разговор открыт (isOpen === true), футер не рендерится (возвращается null).
// Мы создаем компоненты MobileItem для каждого маршрута, используя данные из массива маршрутов (routes.map).
// Каждый MobileItem получает информацию о маршруте (путь, состояние активности, иконку и функцию обработчика клика).

"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation(); // Получение состояния разговора (открыт или закрыт) с помощью пользовательского хука useConversation

  if (isOpen) {
    return null; // Возврат null, что означает отсутствие футера
  }

  return (
    <div
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      ">
      {routes.map(
        (
          route // Проход по массиву маршрутов и создание компонента MobileItem для каждого маршрута
        ) => (
          <MobileItem
            key={route.href} // Использование href в качестве ключа, чтобы обеспечить уникальность
            href={route.href} // Передача пути маршрута в качестве пропса
            active={route.active} // Передача состояния активности маршрута в качестве пропса
            icon={route.icon} // Передача иконки маршрута в качестве пропса
            onClick={route.onClick} // Передача функции обработчика клика на маршрут в качестве пропса
          />
        )
      )}
    </div>
  );
};

export default MobileFooter;
