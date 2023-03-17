import { ProtocolsService } from './protocols.service';
import { RemovingProtocol } from './models/protocols.entity';
export declare class ProtocolsControler {
    private protocolsService;
    constructor(protocolsService: ProtocolsService);
    getProtocols(): Promise<RemovingProtocol[]>;
}
