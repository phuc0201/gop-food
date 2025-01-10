import { NotificationType } from "./enums/index.enum";

export class Notification {
  type: NotificationType = NotificationType.SUCCESS;
  title: string = '';
  content: string = '';
  iconUrl: string = '';
  titleColor: string = '';
  contentColor: string = '';
  iconColor: string = '';

  constructor(type: NotificationType, title: string, content: string, iconUrl: string, titleColor: string, contentColor: string, iconColor: string) {
    this.type = type;
    this.title = title;
    this.content = content;
    this.iconUrl = iconUrl;
    this.titleColor = titleColor;
    this.contentColor = contentColor;
    this.iconColor = iconColor;
  }
}
