import { GameDataInformation } from "./types";

export const generateDefaultState: (hardMode?: boolean) => GameDataInformation = (hardMode) => {
    return {
        hasLetterFix: false,
        hasSectorScanFix: false,
        hasSequenceFix: false,
        hasTempertureFix: false,
        hasFinalFragments: false,
        tempFragment: 'gaMma-134-actIvate',
        sequenceFragment: '892-epSilon-activate',
        letterFragment: 'pSi-11-xI-activate',
        sectorScanFragment: 'deLta-007-activatE',
        disableFrag1: 'disable-337-alpha-theta',
        disableFrag2: 'disable-802-omega-zeta',
        disableFrag3: 'disable-007-beta-iota',
        disableFrag4: 'disable-1273-delta-epsilon',
        decryptCode: 'missile',
        hardMode
    }
}