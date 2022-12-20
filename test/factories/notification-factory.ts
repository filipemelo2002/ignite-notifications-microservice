import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(props: Override = {}) {
  return new Notification({
    content: new Content('Você recebeu uma solicitação de amizade'),
    recipientId: 'another-recipient-id-test',
    category: 'social',
    ...props,
  });
}
