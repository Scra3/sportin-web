export default interface MailProxyI {
  send(email: string, message: string): Promise<void>;
}
