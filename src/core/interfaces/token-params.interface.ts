export enum Context {
  login = 'LOGIN',
  reset_password = 'RESET-PASSWORD',
  invitation = 'INVITATION',
  establish_session = 'ESTABLISH_SESSION',
  refresh_token = 'REFRESH_TOKEN',
}

export interface TokenParams {
  id: number;
  uuid: string;
  email: string;
  context?: Context;
  session_id?: string;
}
