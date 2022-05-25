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
    state: ZeroDayFootballState = { gameState: GameState.START_UP, decodeAttempts: 0 }

    handleStartupClick = () => {
        this.removeCommandLine(() => {
            this.restartSystem()
        })
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
                    this.props.writeText({ message: 'Device is activating polymorphic algorithms, and has locked us out of the system!', color: 'red' }, () => {
                        this.props.writeText({ message: "Now attempting to reboot and restore access", color: 'red' }, () => {
                            this.props.addLine([
                                <LoadingHelper
                                    message='Rebooting...'
                                    color
                                    startPercent={0}
                                    endPercent={100}
                                    transitionSpeed={1000}
                                    onFinish={() => {
                                        this.props.writeText({ message: 'Access restored.' }, () => {
                                            this.goToCommandLine();
                                        })
                                    }}
                                />
                            ])
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
                                        message="Decrypting main partition..."
                                        showPercent
                                        transitionSpeed={900}
                                        onFinish={() => { }}
                                    />,
                                    <LoadingHelper
                                        startPercent={0}
                                        endPercent={100}
                                        message="Executing data stabilization..."
                                        showPercent
                                        transitionSpeed={650}
                                        onFinish={() => { }}
                                    />,
                                    <LoadingHelper
                                        startPercent={0}
                                        endPercent={100}
                                        message="Engaging binary protocols..."
                                        showPercent
                                        transitionSpeed={500}
                                        onFinish={() => { }}
                                    />,
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
                                                state.hasFinalFragments = false;
                                                this.props.updateOverallState(state, () => {
                                                    this.props.addLine([
                                                        <LoadingHelper
                                                            startPercent={0}
                                                            endPercent={100}
                                                            message="Downloading deactivation code 1..."
                                                            showPercent
                                                            transitionSpeed={200}
                                                            onFinish={() => { }}
                                                        />,
                                                        <LoadingHelper
                                                            startPercent={0}
                                                            endPercent={100}
                                                            message="Downloading deactivation code 2..."
                                                            showPercent
                                                            transitionSpeed={300}
                                                            onFinish={() => { }}
                                                        />,
                                                        <LoadingHelper
                                                            startPercent={0}
                                                            endPercent={100}
                                                            transitionSpeed={400}
                                                            message="Downloading deactivation code 3..."
                                                            showPercent
                                                            onFinish={() => { }}
                                                        />,
                                                        <LoadingHelper
                                                            startPercent={0}
                                                            endPercent={100}
                                                            transitionSpeed={500}
                                                            showPercent
                                                            message={"Downloading final code..."}
                                                            onFinish={() => {
                                                                this.props.writeText({ message: "Download complete." }, () => {
                                                                    let state = { ...this.props.overallState };
                                                                    state.hasFinalFragments = true;
                                                                    this.props.updateOverallState(state, () => {
                                                                        setTimeout(() => {
                                                                            this.props.clearLines(() => {
                                                                                this.props.addLine(["All codes are now available."]);
                                                                            })
                                                                        }, 5000)
                                                                    })

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
            {this.state.gameState === GameState.START_UP && <button style={{ backgroundColor: 'black', borderColor: 'limegreen', color: 'limegreen', borderRadius: '0.1rem', padding: '0.5rem' }} onClick={this.handleStartupClick}>Engage System</button>}
        </div>);
    }
}

export default ZeroDayFootball;