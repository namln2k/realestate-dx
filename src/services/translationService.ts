import { MESSAGES } from "@/constants";

export function getMessage(messageCode: string): string {
  if (MESSAGES[messageCode]) {
    return MESSAGES[messageCode];
  }

  return messageCode;
}
