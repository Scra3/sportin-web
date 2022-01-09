import MailProxyI from '../boundaries/proxies/mail';

export default class MailProxy implements MailProxyI {
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  send(email: string, message: string): Promise<void> {
    return Promise.resolve();
  }
}
