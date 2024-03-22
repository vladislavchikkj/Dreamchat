import clsx from "clsx"; // Импорт функции clsx для объединения CSS классов
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"; // Импорт типов и хуков из react-hook-form

interface InputProps {
  // Определение интерфейса свойств компонента Input
  label: string; // Текст метки поля ввода
  id: string; // Уникальный идентификатор поля ввода
  type?: string; // Тип поля ввода
  required?: boolean; // Флаг обязательности заполнения поля ввода
  register: UseFormRegister<FieldValues>; // Хук регистрации поля ввода из react-hook-form
  errors: FieldErrors; // Объект ошибок для полей ввода
  disabled?: boolean; // Флаг отключения поля ввода
}

const Input: React.FC<InputProps> = ({
  // Компонент Input, принимающий свойства InputProps
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  // Деструктуризация свойств компонента Input
  return (
    // Возвращаем элемент ввода
    <div>
      {/* Обертка для поля ввода и метки */}
      <label // Элемент метки
        className="block
        text-sm
        font-medium
        leading-6
        text-gray-900"
        htmlFor={id}>
        {/* Задаем свойство htmlFor для связывания метки с полем ввода */}
        {label} {/* Текст метки */}
      </label>
      <div className="mt-2">
        {/* Обертка для поля ввода */}
        <input // Элемент ввода
          id={id} // Уникальный идентификатор поля ввода
          type={type} // Тип поля ввода
          autoComplete={id} // Автозаполнение
          disabled={disabled} // Флаг отключения поля ввода
          {...register(id, { required })} // Регистрация поля ввода с react-hook-form и установка правил валидации
          className={clsx(
            // Применение CSS классов с помощью функции clsx
            `
           form-input
           block
           w-full
           rounded-md
           border-0
           py-1.5
           text-gray-900
           shadow-sm
           ring-1
           ring-inset
           ring-gray-300
           placeholder:text-gray-400
           focus:ring-2
           focus:ring-sky-600
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500", // Если есть ошибка для данного поля, применить стили ошибки
            disabled && "opacity-50 cursor-default" // Если поле ввода отключено, применить стили отключенного поля ввода
          )}
        />
      </div>
    </div>
  );
};

export default Input;
