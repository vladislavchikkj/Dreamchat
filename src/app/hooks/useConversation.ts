// Этот пользовательский хук useConversation используется для работы с идентификатором разговора
// и проверки его наличия в параметрах маршрута. Когда компонент использует этот хук, он получает объект с двумя свойствами:
// isOpen: Булевое значение, указывающее, открыт ли разговор. Если conversationId не пустой, то isOpen равен true, иначе false.
// conversationId: Строка, содержащая идентификатор разговора из параметров маршрута.
// Хук использует мемоизацию для оптимизации вычислений, чтобы избежать лишних пересчетов при изменении зависимостей.

import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    // Создание мемоизированного значения для conversationId
    if (!params?.conversationId) {
      // Если параметр conversationId отсутствует или равен null/undefined
      return ""; // Возвращается пустая строка
    }

    return params.conversationId as string; // Возвращается значение параметра conversationId в виде строки
  }, [params?.conversationId]); // Зависимость от параметра conversationId

  const isOpen = useMemo(() => !!conversationId, [conversationId]); // Проверка наличия значения conversationId с помощью мемоизации

  return useMemo(
    // Возвращение мемоизированного объекта
    () => ({
      isOpen, // Свойство isOpen, которое указывает, открыт ли разговор (true/false)
      conversationId, // Свойство conversationId, содержащее идентификатор разговора
    }),
    [isOpen, conversationId] // Зависимости от isOpen и conversationId
  );
};

export default useConversation;
