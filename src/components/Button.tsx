"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined; // Тип кнопки может быть "button", "submit", "reset" или undefined
  fullWidth?: boolean; // Принимает ли кнопка всю доступную ширину
  children?: React.ReactNode; // Дочерние элементы кнопки
  onClick?: () => void; // Обработчик события клика
  secondary?: boolean; // Флаг вторичного стиля кнопки
  danger?: boolean; // Флаг опасного стиля кнопки
  disabled?: boolean; // Флаг отключения кнопки
}

const Button: React.FC<ButtonProps> = ({
  // Компонент Button, принимающий свойства ButtonProps
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
          
          flex
          justify-center
          rounded-md
          px-3
          py-2
          text-sm
          font-semibold
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2"></button>
          `,
        disabled && "opacity-50 cursor-default", // Если кнопка отключена, применить стили для отключенной кнопки
        fullWidth && "w-full", // Если кнопка должна занимать всю доступную ширину, применить соответствующий стиль
        secondary ? "text-gray-900" : "text-white", // Если у кнопки вторичный стиль, применить соответствующий цвет текста
        danger && // Если у кнопки опасный стиль, применить соответствующие стили
          "border-rose-600 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary && // Если у кнопки не вторичный стиль и не опасный стиль, применить стили по умолчанию
          !danger &&
          "bg-pink-600 hover:bg-pink-800 focus-visible:outline-pink-800"
      )}>
      {children}
    </button>
  );
};

export default Button; // Экспорт компонента Button
