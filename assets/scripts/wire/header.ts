export enum AtlasWireKind {
    Request = 0b0000_0001,
    ResponseOk = 0b0000_0010,
    ResponseErr = 0b0000_0100,
    Notify = 0b0000_1000,
}

export const ATLAS_WIRE_HEADER_LEN = 33;

export interface AtlasWireHeader {
    id: { hi: number; lo: number };     // u64
    slotIndex: number;                  // u32
    method: number;                     // u32
    kind: AtlasWireKind;                // u8
    uid: Uint8Array;                    // [u8;16]
}