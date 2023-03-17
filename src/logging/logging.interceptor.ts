import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { LoggingEntity } from "./logging.entity";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const newLogging = new LoggingEntity();
    const now = Date.now();
    newLogging.body = request.body ?? null;
    newLogging.url = request.url;
    newLogging.method = request.method;
    newLogging.username = request.user?.username ?? null;


    return next
      .handle()
      .pipe(
        tap({
          next: (result) => {
            newLogging.result = result;
            newLogging.type = 'log';
            newLogging.time_ms = Date.now() - now;
            newLogging.save();
          }, error: (result) => {
            newLogging.result = result;
            newLogging.type = 'error';
            newLogging.time_ms = Date.now() - now;
            newLogging.save()
          }
        })
      );
  }
}
