export enum GameState {
    NO_STATE,
    COMMAND_LINE,
    RESTORE,
}

export interface GameDataInformation {
    hasTempertureFix: boolean
    hasSequenceFix: boolean
    hasLetterFix: boolean
    hasSectorScanFix: boolean
    hasFinalFragments: boolean
    tempFragment: string
    sequenceFragment: string
    letterFragment: string
    sectorScanFragment: string
    disableFrag1: string
    disableFrag2: string
    disableFrag3: string
    disableFrag4: string
    decryptCode: string
    hardMode?: boolean
}