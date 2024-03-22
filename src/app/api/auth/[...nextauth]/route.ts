/*
Этот файл содержит настройки аутентификации. 
Он использует библиотеку NextAuth.js для управления аутентификацией пользователей.

Аутентификация может происходить через различные провайдеры, такие как GitHub, Google или пользовательские учетные данные.

Конфигурация провайдеров и адаптера Prisma указывает на использование базы данных Prisma для хранения данных об аутентификации.

При аутентификации через учетные данные (CredentialsProvider), происходит проверка email и пароля пользователя.

Если аутентификация успешна, возвращается объект пользователя, в противном случае генерируется ошибка.

Приложение может использовать обработчик `GET` или `POST` для обработки запросов на аутентификацию в зависимости от метода HTTP.

*/

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";

// Опции аутентификации
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma), // Использование Prisma в качестве адаптера для хранения данных об аутентификации
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development", // Включение отладочных сообщений в режиме разработки
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Секретный ключ для подписи JWT-токенов
};

// Создание обработчика NextAuth на основе опций аутентификации
const handler = NextAuth(authOptions);

// Экспорт обработчика для обработки GET и POST запросов
export { handler as GET, handler as POST };
