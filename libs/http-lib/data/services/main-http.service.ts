import { IBody } from "../interfaces/body";
import { ISimpleRequestDto } from "../requests";
import { ISimpleResponseDto } from "../response";

export class MainHttpService {
    private _storage: any;

    public get(dto: ISimpleRequestDto): ISimpleResponseDto {
        const testBody: IBody = {
            code: 120,
            type: 'simple'
        }
        
        return {
            body: null,
            code: 200
        };
    }
}