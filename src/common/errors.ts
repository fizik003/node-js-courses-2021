export class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized Error') {
    super(401, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden Error') {
    super(403, message);
  }
}
