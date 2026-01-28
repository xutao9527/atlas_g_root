import { AtlasSuitKind } from "./AtlasSuitKind";
import { AtlasValueKind } from "./AtlasValueKind";

export interface AtlasCardView {
    suit: AtlasSuitKind;
    value: AtlasValueKind;
}
