import * as React from 'react';
import { Component } from 'react';
import { GameWrapper, LoadingHelper } from 'react-terminal-game-builder';
import ZeroDayFootball from '.';
import { generateDefaultState } from './helper-functions';
import TextFragmenter from './text-fragmenter';
import { GameDataInformation } from './types';
import './styles.css'

interface WrappedCompProps {
    hardDifficulty: boolean
}

interface WrappedCompState {
    gameData: GameDataInformation
}

class WrappedZeroDayFootball extends React.Component<WrappedCompProps, WrappedCompState> {
    state: WrappedCompState = { gameData: generateDefaultState() }

    constructor(props: WrappedCompProps) {
        super(props);
        this.state.gameData = generateDefaultState(props.hardDifficulty)
    }

    generateDiskHealth = () => {
        if (!this.state.gameData.hasTempertureFix) {
            return (
                <LoadingHelper
                    key={'alpha'}
                    startPercent={0}
                    endPercent={0}
                    color
                    showPercent
                    message={"Disk health"}
                    onFinish={() => { }}
                />
            )
        }
        else if (!this.state.gameData.hasSequenceFix) {
            return (
                <LoadingHelper
                    key={'alpha2'}
                    startPercent={0}
                    endPercent={25}
                    color
                    showPercent
                    message={"Disk health"}
                    onFinish={() => { }}
                />
            )
        }
        else if (!this.state.gameData.hasLetterFix) {
            return (
                <LoadingHelper
                    key={'alpha3'}
                    startPercent={25}
                    endPercent={50}
                    color
                    showPercent
                    message={"Disk health"}
                    onFinish={() => { }}
                />
            )
        }
        else if (!this.state.gameData.hasSectorScanFix) {
            return (
                <LoadingHelper
                    key={'alpha4'}
                    startPercent={50}
                    endPercent={75}
                    color
                    showPercent
                    message={"Disk health"}
                    onFinish={() => { }}
                />
            )
        }
        else {
            return (
                <LoadingHelper
                    key={'alpha5'}
                    startPercent={75}
                    endPercent={100}
                    color
                    showPercent
                    message={"Disk health"}
                    onFinish={() => { }}
                />
            )
        }

    }
    generateCodeFragment = () => {
        return (
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Activation Code 1</div>
                    <TextFragmenter show={this.state.gameData.hasTempertureFix} text={this.state.gameData.tempFragment} stop={this.state.gameData.hasFinalFragments} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Activation Code 2</div>
                    <TextFragmenter show={this.state.gameData.hasSequenceFix} text={this.state.gameData.sequenceFragment} stop={this.state.gameData.hasFinalFragments} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Activation Code 3</div>
                    <TextFragmenter show={this.state.gameData.hasLetterFix} text={this.state.gameData.letterFragment} stop={this.state.gameData.hasFinalFragments} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Activation Code 4</div>
                    <TextFragmenter show={this.state.gameData.hasSectorScanFix} text={this.state.gameData.sectorScanFragment} stop={this.state.gameData.hasFinalFragments} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Deactivation Code 1</div>
                    <TextFragmenter show={this.state.gameData.hasFinalFragments} text={this.state.gameData.disableFrag1} stop={false} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Deactivation Code 2</div>
                    <TextFragmenter show={this.state.gameData.hasFinalFragments} text={this.state.gameData.disableFrag2} stop={false} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Deactivation Code 3</div>
                    <TextFragmenter show={this.state.gameData.hasFinalFragments} text={this.state.gameData.disableFrag3} stop={false} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div>Deactivation Code 4</div>
                    <TextFragmenter show={this.state.gameData.hasFinalFragments} text={this.state.gameData.disableFrag4} stop={false} />
                </div>
            </div>
        )
    }

    render() {

        return (<div className="total-page terminal-background">
            <div className="terminal-title"></div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <div className="terminal-holder">
                    <GameWrapper overallState={this.state.gameData} onUpdateExternalState={(state, callback) => { this.setState({ gameData: state }, callback) }} startingComponent={ZeroDayFootball} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="timer-parent1">
                        {this.generateCodeFragment()}
                    </div>
                    <div className='timer-parent1'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>{this.generateDiskHealth()}</div>
                            {this.state.gameData.hasSectorScanFix && <div>This disk has been restored! New commands are now available.</div>}
                            {this.state.gameData.hasSectorScanFix && <div>Encryption scheme "cApItAl" detected.</div>}
                        </div>
                    </div>
                </div>

            </div>

        </div>);
    }
}

export default WrappedZeroDayFootball;