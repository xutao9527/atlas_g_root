import * as msgpack from '@msgpack/msgpack';
import {ATLAS_WIRE_HEADER_LEN, AtlasFrameHeader} from "db://assets/scripts/proto/base/Header";
import {AtlasFrame, AtlasFrameBody} from "db://assets/scripts/proto/base/Message";

const encode = (msgpack as any).default.encode;
const decode = (msgpack as any).default.decode;

export function encodeHeader(h: AtlasFrameHeader): Uint8Array {
    if (h.uid.length !== 16) {
        throw new Error(`AtlasWireHeader.uid must be 16 bytes, got ${h.uid.length}`);
    }

    const buf = new ArrayBuffer(ATLAS_WIRE_HEADER_LEN);
    const view = new DataView(buf);
    let o = 0;

    // u64 id (BE)
    view.setUint32(o, h.id.hi >>> 0, false);
    o += 4;
    view.setUint32(o, h.id.lo >>> 0, false);
    o += 4;

    // u32 slot
    view.setUint32(o, h.slotIndex >>> 0, false);
    o += 4;

    // u32 method
    view.setUint32(o, h.op_code >>> 0, false);
    o += 4;

    // u8 kind
    view.setUint8(o, h.kind & 0xff);
    o += 1;

    // uid[16]
    new Uint8Array(buf, o, 16).set(h.uid);

    return new Uint8Array(buf);
}

export function decodeHeader(buf: Uint8Array): AtlasFrameHeader {
    if (buf.length < ATLAS_WIRE_HEADER_LEN) {
        throw new Error(`Buffer too short for AtlasWireHeader: ${buf.length}`);
    }
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    let o = 0;

    const idHi = view.getUint32(o, false);
    o += 4;
    const idLo = view.getUint32(o, false);
    o += 4;
    const slotIndex = view.getUint32(o, false);
    o += 4;
    const op_code = view.getUint32(o, false);
    o += 4;
    const kind = view.getUint8(o);
    o += 1;

    const uid = new Uint8Array(buf.buffer, buf.byteOffset + o, 16);
    // o += 16;

    return {
        id: {hi: idHi, lo: idLo},
        slotIndex,
        op_code,
        kind,
        uid: new Uint8Array(uid), // 拷贝一份
    };
}

export function encodeMessage<T>(msg: AtlasFrame<T>): Uint8Array {
    const h = encodeHeader(msg.header);
    const p = encode(msg.payload);
    const out = new Uint8Array(h.length + p.length);
    out.set(h, 0);
    out.set(p, h.length);
    return out;
}

export function decodeMessage<T extends AtlasFrameBody>(buf: Uint8Array): AtlasFrame<T> {
    if (buf.length < ATLAS_WIRE_HEADER_LEN) {
        throw new Error('Buffer too short to decode message');
    }
    const headerBuf = buf.subarray(0, ATLAS_WIRE_HEADER_LEN);
    const payloadBuf = buf.subarray(ATLAS_WIRE_HEADER_LEN);
    const header = decodeHeader(headerBuf);
    const payload = decode(payloadBuf) as T;
    return {header, payload};
}