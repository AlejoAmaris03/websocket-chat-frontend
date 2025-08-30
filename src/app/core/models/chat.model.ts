import { MessageModel } from "./message.model";

export interface ChatModel {
    chat: MessageModel;
    messagePosition: string;
}