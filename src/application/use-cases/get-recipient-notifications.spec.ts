import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('Get the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id-test',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-id-test',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'another-recipient-id-test',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-id-test',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-test' }),
        expect.objectContaining({ recipientId: 'recipient-id-test' }),
      ]),
    );
  });
});
