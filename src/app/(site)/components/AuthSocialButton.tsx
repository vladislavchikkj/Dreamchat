import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  // Определение интерфейса свойств компонента AuthSocialButton
  icon: IconType; // Тип иконки для отображения
  onClick: () => void; // Обработчик события клика
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  // Компонент AuthSocialButton, принимающий свойства AuthSocialButtonProps
  icon: Icon, // Иконка, переданная в свойстве icon
  onClick,
}) => {
  // Деструктуризация свойств компонента AuthSocialButton
  return (
    // Возвращаем кнопку для авторизации через социальные сети
    <button
      type="button" // Тип кнопки
      onClick={onClick} // Обработчик клика кнопки
      className="
      inline-flex 
      w-full 
      justify-center 
      rounded-md 
      bg-white 
      px-4 
      py-2 
      text-gray-500 
      shadow-sm 
      ring-1 
      ring-inset 
      ring-gray-300 
      hover:bg-gray-50 
      focus:outline-offset-0">
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
