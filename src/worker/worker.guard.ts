import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import axios from 'axios';
import { Worker } from './worker.interface';

@Injectable()
export class WorkerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    const token = bearerToken.replace("Bearer ", "");

    const response = await axios.get('http://localhost:4500/introspect', {
      params: { token },
    });

    const employeeId = response.data.data.name;
    const allowedEmployeeIds = ["John Doe"];
    const scope = response.data.data.scope;

    if (!allowedEmployeeIds.includes(employeeId)) {
      throw new ForbiddenException('Vous n\'avez pas les autorisations nécessaires pour accéder à cette ressource');
    }

    if (scope === 'salary') {
      request.user = { name: employeeId, scope: 'salary' };
      return true;
    }

    if (scope === 'identity') {
      request.user = { name: employeeId, scope: 'identity' };
      return true;
    }

    request.user = { name: employeeId, scope: '' };
    return true;
  }
}

