import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('counts the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-test',
    });

    expect(count).toEqual(2);
  });
});
