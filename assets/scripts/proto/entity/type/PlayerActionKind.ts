export type PlayerActionKind =
    | { kind: "Fold" }
    | { kind: "Call" }
    | { kind: "Check" }
    | { kind: "Bet"; amount: number }
    | { kind: "Raise"; amount: number };