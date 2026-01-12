import * as msgpack from '@msgpack/msgpack';
import {ATLAS_WIRE_HEADER_LEN, AtlasWireHeader} from "db://assets/scripts/wire/base/header";
import {AtlasWireMessage} from "db://assets/scripts/wire/base/message";


const encode = (msgpack as any).default.encode;
console.log('msgpack.encode =', (msgpack as any).encode);
console.log('msgpack.default =', (msgpack as any).default);

export function encodeHeader(h: AtlasWireHeader): Uint8Array {
    if (h.uid.length !== 16) {
        throw new Error(`AtlasWireHeader.uid must be 16 bytes, got ${h.uid.length}`);
    }

    const buf = new ArrayBuffer(ATLAS_WIRE_HEADER_LEN);
    const view = new DataView(buf);
    let o = 0;

    // u64 id (BE)
    view.setUint32(o, h.id.hi >>> 0, false); o += 4;
    view.setUint32(o, h.id.lo >>> 0, false); o += 4;

    // u32 slot
    view.setUint32(o, h.slotIndex >>> 0, false); o += 4;

    // u32 method
    view.setUint32(o, h.method >>> 0, false); o += 4;

    // u8 kind
    view.setUint8(o, h.kind & 0xff); o += 1;

    // uid[16]
    new Uint8Array(buf, o, 16).set(h.uid);

    return new Uint8Array(buf);
}


export function encodeMessage<T>(
    msg: AtlasWireMessage<T>
): Uint8Array {
    const h = encodeHeader(msg.header);
    const p = encode(msg.payload);

    const out = new Uint8Array(h.length + p.length);
    out.set(h, 0);
    out.set(p, h.length);
    return out;
}