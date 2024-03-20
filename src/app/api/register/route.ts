/*
Этот файл содержит функцию POST, которая обрабатывает POST запросы.

Функция POST принимает JSON-запрос, извлекает из него данные о пользователе (email, name, password), хеширует пароль с помощью bcrypt,
создает новую запись пользователя в базе данных с использованием Prisma, а затем возвращает JSON-ответ с информацией о созданном пользователе.

*/

import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb"; // Импорт экземпляра PrismaClient из файла prismadb
import { NextResponse } from "next/server"; // Импорт NextResponse для отправки ответов

// Функция обработки POST запросов
export async function POST(request: Request) {
  // Извлечение тела JSON запроса
  const body = await request.json();
  // Извлечение данных пользователя (email, name, password) из тела запроса
  const { email, name, password } = body;

  // Хеширование пароля с помощью bcrypt
  const hashedPassword = await bcrypt.hash(password, 12);

  // Создание новой записи пользователя в базе данных с использованием Prisma
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // Возврат JSON-ответа с информацией о созданном пользователе
  return NextResponse.json(user);
}
