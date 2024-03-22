import { PrismaClient } from "@prisma/client";

// Объявление глобального пространства имен
declare global {
  // Объявление глобальной переменной prisma, которая может содержать экземпляр PrismaClient или undefined
  var prisma: PrismaClient | undefined;
}

// Создание экземпляра PrismaClient или использование уже существующего экземпляра, если он был создан ранее
const client = globalThis.prisma || new PrismaClient();

// Если переменная NODE_ENV не установлена в значение "production", сохраняем созданный экземпляр PrismaClient в глобальную переменную prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
