import { MessageType } from "../utils";

export interface MessageModel {
    sender: string;
    message: string;
    type: MessageType;
}