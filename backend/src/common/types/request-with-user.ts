export class ActiveUser {
  userId: string;
  email: string;
  companyId: string | null;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'DISPATCHER' | 'DRIVER';
}

export class RequestWithUser extends Request {
  user: ActiveUser;
}
