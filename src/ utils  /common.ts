import * as bcrypt from 'bcrypt';
import { RStatus } from '../models/dto/result.dto';
import { userRoles } from './enum';

export class Common {
    public static async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    public static getBizCode(code: string): RStatus {
        const rstatus = new RStatus();

        switch (code) {
            case "200": { rstatus.code = "200"; rstatus.description = "Success"; break; }
            case "201": { rstatus.code = "201"; rstatus.description = "Created"; break; }
            case "204": { rstatus.code = "204"; rstatus.description = "No Content"; break; }
            case "400": { rstatus.code = "400"; rstatus.description = "Bad Request"; break; }
            case "401": { rstatus.code = "401"; rstatus.description = "Unauthorized"; break; }
            case "403": { rstatus.code = "403"; rstatus.description = "Forbidden"; break; }
            case "404": { rstatus.code = "404"; rstatus.description = "Not Found"; break; }
            case "409": { rstatus.code = "409"; rstatus.description = "Conflict"; break; }
            case "500": { rstatus.code = "500"; rstatus.description = "Internal Server Error"; break; }
            default: { rstatus.code = "500"; rstatus.description = "Internal Server Error"; break; }
        }
        
        return rstatus;
    }

    public static getUserRole(role: userRoles): string {
        switch (role) {
            case userRoles.ADMIN: return "ADMIN";
            case userRoles.USER: return "USER";
            case userRoles.GUEST: return "GUEST";
            default: return "USER";
            
        }
    }

    
}