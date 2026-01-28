export enum AtlasFrameKind {
    Request = 1,
    ResponseOk = 2,
    ResponseErr = 3,
    Notify = 4,
    RegNode = 5,
}

export const ATLAS_WIRE_HEADER_LEN = 33;

export interface AtlasFrameHeader {
    id: { hi: number; lo: number };     // u64
    slotIndex: number;                  // u32
    op_code: number;                     // u32
    kind: AtlasFrameKind;                // u8
    uid: Uint8Array;                    // [u8;16]
}