import {encodeMessage} from "db://assets/scripts/wire/base/Codec";
import {AtlasWireHeader, AtlasWireKind} from "db://assets/scripts/wire/base/Header";

export interface AtlasWireMessage<T> {
    header: AtlasWireHeader;
    payload: T;
}

type BuildOpts = Partial<{
    idHi: number;
    idLo: number;
    slotIndex: number;
    kind: AtlasWireKind;
    uid: Uint8Array;
}>;

export abstract class WirePayload {
    /** 每个子类必须提供 */
    static readonly METHOD: number;

    buildMessage<T extends this>(
        this: T,
        opts?: BuildOpts
    ): AtlasWireMessage<T> {
        const ctor = this.constructor as typeof WirePayload & {
            METHOD: number;
        };

        return {
            header: {
                id: {
                    hi: opts?.idHi ?? 0,
                    lo: opts?.idLo ?? 0,
                },
                slotIndex: opts?.slotIndex ?? 0,
                method: ctor.METHOD,
                kind: opts?.kind ?? AtlasWireKind.Request,
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

