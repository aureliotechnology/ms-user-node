import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

export class RegisterLogger {
    constructor(private readonly httpService: HttpService) {
    }
    
    async sendError(message, stack, context) {
        const register = await lastValueFrom(this.httpService.post(
            'http://localhost:3002/logger/error-server', 
            {
            message: message,
            stack: stack,
            context: context
            }
        ))
    }
}