import {encodeMessage} from "db://assets/scripts/proto/base/Codec";
import {AtlasFrameHeader, AtlasFrameKind} from "db://assets/scripts/proto/base/Header";

export interface AtlasFrame<T> {
    header: AtlasFrameHeader;
    payload: T;
}

type BuildOpts = Partial<{
    idHi: number;
    idLo: number;
    slotIndex: number;
    kind: AtlasFrameKind;
    uid: Uint8Array;
}>;

export abstract class AtlasFrameBody {
    /** 每个子类必须提供 */
    static readonly OP_CODE: number;

    buildMessage<T extends this>(
        this: T,
        opts?: BuildOpts
    ): AtlasFrame<T> {
        const ctor = this.constructor as typeof AtlasFrameBody & {
            OP_CODE: number;
        };

        return {
            header: {
                id: {
                    hi: opts?.idHi ?? 0,
                    lo: opts?.idLo ?? 0,
                },
                slotIndex: opts?.slotIndex ?? 0,
                op_code: ctor.OP_CODE,
                kind: opts?.kind ?? AtlasFrameKind.Request,
                uid: opts?.uid ?? new Uint8Array(16),
            },
            payload: this,
        };
    }

    buildRawMessage<T extends this>(
        this: T,
        opts?: BuildOpts
    ): Uint8Array {
        const msg = this.buildMessage(opts);
        return encodeMessage(msg);
    }
}

