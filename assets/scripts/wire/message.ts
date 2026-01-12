import { AtlasWireHeader } from "./header";

export interface AtlasWireMessage<T> {
    header: AtlasWireHeader;
    payload: T;
}