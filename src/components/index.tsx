import * as React from 'react';
import { Component } from 'react';
import { LoadingHelper, TerminalInputHelper, Types } from 'react-terminal-game-builder';
import ZeroDayFootballRestore from './restore';
import { GameDataInformation, GameState } from './types';

export interface ZeroDayFootballProps extends Types.GameComponentProps<GameDataInformation> {
}

interface ZeroDayFootballState {
    gameState: GameState
    decodeAttempts: number
}

class ZeroDayFootball extends React.Component<ZeroDayFootballProps, ZeroDayFootballState> {
    state: ZeroDayFootballState = { gameState: GameState.NO_STATE, decodeAttempts: 0 }
    timesUpdated = 0;
    componentDidMount() {
        console.log("Mount");
        this.timesUpdated++;
        if (this.timesUpdated === 1) {
            this.restartSystem()
        }

    }

    removeCommandLine = (callback?: () => void) => {
        this.setState({ gameState: GameState.NO_STATE }, callback)
    }

    goToCommandLine = (fullText: boolean = true) => {
        this.setState({ gameState: GameState.NO_STATE }, () => {
            if (fullText) {
                this.props.writeText({ message: `Command line ready, please type "help" for a list of available commands` }, () => {
                    this.setState({ gameState: GameState.COMMAND_LINE })
                })
            }
            else {
                this.setState({ gameState: GameState.COMMAND_LINE })
            }
        })
    }

    restartSystem = () => {
        this.props.writeText({ message: `Initalizing Starfleet Intelligence Recovery and Decryption System` }, () => {
            this.props.writeText({ message: `New disk detected, attempting to load profile and status` }, () => {
                this.props.addLine([
                    <LoadingHelper
                        startPercent={0}
                        endPercent={100}
                        message="Scanning Disk..."
                        color
                        transitionSpeed={200}
                        showPercent
                        onFinish={() => {
                            this.props.writeText({ message: 'Disk scan complete. Disk requires restoration and decryption.' }, () => {
                                this.goToCommandLine()
                            })
                        }} />
                ])
            })
        })
    }

    doHelp = () => {
        let helpArray: any[] = [];
        helpArray.push(`restore - If needed, will scan and attempt to restore the device.`, `Example: "> restore"`, "");
        this.props.overallState.hasSectorScanFix && helpArray.push(`decrypt - Allows a password to be entered to decrypt the device.`, `Example: "> decrypt [password]" like "> decrypt swordfish`, "");
        helpArray.push(`help - Displays this list.`, `Example: "> help"`, "");
        helpArray.push(`clear - Clears the current terminal`, `Example: "> clear"`, "");
        this.props.addLine(helpArray, () => this.goToCommandLine(false));

    }

    doUnknownCommand = () => {
        this.props.addLine(["Command not recognized. Please type 'help' for a list of available commands."], () => {
            this.goToCommandLine(false);
        })
    }
    doPolymorphicAlgorithim = () => {
        this.removeCommandLine(() => {
            this.props.clearLines(() => {
                this.props.writeText({ message: `WARNING!!! Booby trap triggered!`, color: 'red' }, () => {
                    this.props.writeText({ message: 'Device is activating polymorphic algorithms, code fragments have been encrypted!', color: 'red' }, () => {
                        let newState = { ...this.props.overallState }
                        newState.hasLetterFix = false;
                        newState.hasSectorScanFix = false;
                        newState.hasTempertureFix = false;
                        newState.hasSequenceFix = false;
                        this.props.updateOverallState(newState, () => {
                            this.props.writeText({ message: 'Codes will need to be rediscovered.', color: 'red' }, () => {
                                this.goToCommandLine();
                            })
                        })
                    })
                })
            })
        })

    }

    handleVictoryDecode = () => {
        this.props.writeText({ message: "Attempting to decrypt section 001..." }, () => {
            this.props.clearLines(() => {
                setTimeout(() => {
                    this.props.writeText({ message: "Decode section successful." }, () => {
                        setTimeout(() => {
                            this.props.writeText({ message: "This system will now decrypt the device..." }, () => {
                                this.props.addLine([
                                    <LoadingHelper
                                        startPercent={0}
                                        endPercent={100}
                                        color
                                        transitionSpeed={1000}
                                        showPercent
                                        message={"Decryption in progress..."}
                                        onFinish={() => {
                                            this.props.writeText({ message: "Decryption complete. Downloading final codes now." }, () => {
                                                let state = { ...this.props.overallState };
                                                state.hasFinalFragments = true;
                                                this.props.updateOverallState(state, () => {
                                                    this.props.addLine([
                                                        <LoadingHelper
                                                            startPercent={0}
                                                            endPercent={100}
                                                            color
                                                            transitionSpeed={500}
                                                            showPercent
                                                            message={"Downloading..."}
                                                            onFinish={() => {
                                                                this.props.writeText({ message: "Download complete." }, () => {
                                                                    setTimeout(() => {
                                                                        this.props.clearLines(() => {
                                                                            this.props.addLine(["All codes are now available."]);
                                                                        })
                                                                    }, 5000)
                                                                })
                                                            }} />
                                                    ])
                                                })

                                            })
                                        }} />
                                ])
                            })
                        })
                    })
                }, 5000)
            })
        })

    }

    handleCommandLineFeedback = (command: string, args: string[], fullText: string) => {
        this.props.addLine([fullText], () => {
            this.removeCommandLine(() => {
                switch (command.toLowerCase()) {
                    case 'restore': {
                        if (!this.props.overallState.hasSectorScanFix) {
                            this.setState({ gameState: GameState.RESTORE })
                        }
                        else {
                            // Already repaired
                            this.props.addLine(["Disk is already restored, restore command not needed"], () => {
                                this.goToCommandLine(false);
                            })
                        }
                        break;
                    }
                    case 'text': {
                        this.props.addLine(["line"], () => {
                            this.props.addLine(['hello'], () => this.goToCommandLine(false))
                        });

                        break;
                    }
                    case 'scroll': {
                        this.props.writeText({ message: 'Line Line Line Line Line Line Line Line Line Line Line line Line' }, () => {
                            this.props.addLine(['hello'], () => this.goToCommandLine(false))
                        })
                        break;
                    }
                    case 'loading': {
                        this.props.addLine([<LoadingHelper
                            startPercent={0}
                            endPercent={100}
                            color
                            transitionSpeed={500}
                            showPercent
                            message={"Downloading..."}
                            onFinish={() => {
                                this.props.addLine(['hello'], () => this.goToCommandLine(false))
                            }} />
                        ])
                        break;
                    }
                    case 'decrypt': {
                        if (!this.props.overallState.hasSectorScanFix) {
                            this.doUnknownCommand()
                        }
                        else if (args[0] && args[0].toLowerCase() === this.props.overallState.decryptCode) {
                            this.handleVictoryDecode();
                        }
                        else {
                            this.props.writeText({ message: "Attempting to decode device..." }, () => {
                                if (this.props.overallState.hardMode) {
                                    if (this.state.decodeAttempts === 3) {
                                        this.setState({ decodeAttempts: 0 }, () => {
                                            this.doPolymorphicAlgorithim()
                                        })
                                    }
                                    else {
                                        let decodeAttempts = this.state.decodeAttempts + 1;
                                        this.setState({ decodeAttempts: decodeAttempts }, () => {
                                            this.props.addLine(['Decode unsuccessful. Please try again.'], () => this.goToCommandLine(false));
                                        })
                                    }
                                }
                                else {
                                    this.props.addLine(['Decode unsuccessful. Please try again.'], () => this.goToCommandLine(false));
                                }
                            })
                        }
                        break;
                    }
                    case 'help': {
                        this.doHelp()
                        break;
                    }
                    case 'clear': {
                        this.props.clearLines(() => this.goToCommandLine())
                        break;
                    }
                    default: {
                        this.doUnknownCommand();
                        break;
                    }
                }
            })
        })
    }

    render() {
        return (<div>
            {this.state.gameState === GameState.COMMAND_LINE && <TerminalInputHelper onSumbitCommand={this.handleCommandLineFeedback} />}
            {this.state.gameState === GameState.RESTORE && <ZeroDayFootballRestore {...this.props} doPolymorphicAlgorithim={this.doPolymorphicAlgorithim} onBack={() => this.props.clearLines(() => this.goToCommandLine())} />}
        </div>);
    }
}

export default ZeroDayFootball;