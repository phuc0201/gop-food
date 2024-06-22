import { NotificationType } from "../utils/enums/index.enum";

export const NotificationColor = [
  {
    type: NotificationType.SUCCESS,
    titleColor: 'rgb(22 101 52)',
    contentColor: 'rgb(21 128 61)',
    iconColor: 'rgb(74 222 128)',
  },
  {
    type: NotificationType.ERROR,
    titleColor: '#991B1B',
    contentColor: '#B91C1C',
    iconColor: '#F87171',
  },
  {
    type: NotificationType.WARNING,
    titleColor: 'rgb(141, 56, 0)',
    contentColor: 'rgb(202 138 4)',
    iconColor: 'rgb(250 204 21)',
  }
]

