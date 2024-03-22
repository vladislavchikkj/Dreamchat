// Этот компонент DesktopItem представляет собой элемент меню для использования на рабочем столе.

// Компонент создает ссылку для маршрута, применяет стили на основе состояния
// активности и обрабатывает клики, вызывая соответствующую функцию обработчика.

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  // Описание интерфейса для пропсов компонента DesktopItem
  label: string; // Метка маршрута
  icon: any; // Иконка маршрута
  href: string; // Путь, на который указывает маршрут
  onClick?: () => void; // Функция обработчика клика на маршрут (необязательная)
  active?: boolean; // Булево значение, указывающее, активен ли текущий маршрут (необязательное)
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      {/* Элемент списка, обрабатывающий клик */}
      <Link // Ссылка для маршрута
        href={href} // Путь, на который указывает ссылка
        className={clsx(
          // Применение классов к ссылке с помощью функции clsx
          `
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-black 
            hover:bg-gray-100
          `,
          active && "bg-gray-100 text-black" // Применение класса для активного состояния маршрута
        )}>
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {/* Иконка маршрута */}
        <span className="sr-only">{label}</span>
        {/* Скрытый текстовый контент для доступности */}
      </Link>
    </li>
  );
};

export default DesktopItem;
