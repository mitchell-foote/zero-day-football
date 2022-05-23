import * as React from 'react';
import { Component } from 'react';
import { ConsolePicker, LoadingHelper, TerminalInputHelper, Types } from 'react-terminal-game-builder';
import { ZeroDayFootballProps } from '..';
import { EasyLetterLines, EasySequenceLines, EasyTempLines, FirstSectorScanLines, HardLetterLines, HardSequenceLines, HardTempLines } from './helpers';
import { RestoreState } from './types';

interface ZeroDayFootballRestoreProps extends ZeroDayFootballProps {
    onBack: () => void
    doPolymorphicAlgorithim: () => void
}

interface ZeroDayFootballRestoreState {
    restoreState: RestoreState
}

class ZeroDayFootballRestore extends React.Component<ZeroDayFootballRestoreProps, ZeroDayFootballRestoreState> {
    state: ZeroDayFootballRestoreState = { restoreState: RestoreState.NO_STATE }

    removeCommandLine = (callback?: () => void) => {
        this.setState({ restoreState: RestoreState.NO_STATE }, callback)
    }

    doTempFix = () => {
        let lines = this.props.overallState.hardMode ? HardTempLines : EasyTempLines;
        this.props.addLine(lines, () => {
            this.setState({ restoreState: RestoreState.TEMP_PUZZLE })
        })
    }

    doSequenceFix = () => {
        let lines = this.props.overallState.hardMode ? HardSequenceLines : EasySequenceLines;
        this.props.addLine(lines, () => {
            this.setState({ restoreState: RestoreState.SEQUENCE_PUZZLE })
        })
    }

    doLetterFix = () => {
        let lines = this.props.overallState.hardMode ? HardLetterLines : EasyLetterLines;
        this.props.addLine(lines, () => {
            this.setState({ restoreState: RestoreState.LETTER_PUZZLE })
        })
    }

    doSectorFix = () => {
        this.removeCommandLine(() => {
            this.props.clearLines(() => {
                let lines = FirstSectorScanLines;
                this.props.addLine(lines, () => {
                    this.props.addLine([
                        <LoadingHelper
                            startPercent={0}
                            endPercent={100}
                            message="Searching..."
                            transitionSpeed={50}
                            showPercent
                            onFinish={() => {
                                this.props.writeText({ message: 'Sector search complete, please select an option from the list below' }, () => {
                                    this.props.writeText({ message: "Selections chosen below will be executed or printed to the terminal" }, () => {
                                        this.setState({ restoreState: RestoreState.SECTOR_PUZZLE })
                                    })
                                })
                            }} />
                    ])
                })
            })
        })
    }

    /**
     * Temp puzzle functions
     */

    handleTempFix = (command: string, args: string[], fullText: string) => {
        this.removeCommandLine(() => {
            let numb = Number(command);
            if (command.toLowerCase() === 'help') {
                this.doTempFix()
            }
            else if (command.toLowerCase() === 'back') {
                this.props.onBack();
            }
            else if (!isNaN(numb)) {
                let targetNumb = this.props.overallState.hardMode ? 4789 : 88;
                if (numb === targetNumb) {
                    this.doSuccessfulTempFix();
                }
                else if (numb > targetNumb) {
                    this.doTempTooHot(command);
                }
                else {
                    this.doTempTooCold(command)
                }
            }
            else {
                this.props.addLine([command + " is not a number"], () => {
                    this.setState({ restoreState: RestoreState.TEMP_PUZZLE })
                })
            }
        })
    }

    doTempTooHot = (command: string) => {
        this.props.writeText({ message: 'Checking...' }, () => {
            setTimeout(() => {
                this.props.addLine([command + " is making device too hot, please try again"], () => {
                    this.setState({ restoreState: RestoreState.TEMP_PUZZLE })
                })
            }, 2000)

        })
    }

    doTempTooCold = (command: string) => {
        this.props.writeText({ message: 'Checking...' }, () => {
            setTimeout(() => {
                this.props.addLine([command + " is making device too cold, please try again"], () => {
                    this.setState({ restoreState: RestoreState.TEMP_PUZZLE })
                })
            }, 2000)

        })
    }

    doSuccessfulTempFix = () => {
        this.props.clearLines(() => {
            this.props.writeText({ message: 'Executing temp change...' }, () => {
                this.props.addLine([
                    <LoadingHelper
                        startPercent={0}
                        endPercent={100}
                        message="Executing..."
                        showPercent
                        onFinish={() => {
                            this.props.writeText({ message: 'Temp regulation successful' }, () => {
                                this.props.writeText({ message: "Detecting code fragment in temperature processor memory, downloading now..." }, () => {
                                    this.props.addLine([
                                        <LoadingHelper
                                            startPercent={0}
                                            endPercent={100}
                                            transitionSpeed={200}
                                            message="Downloading..."
                                            showPercent
                                            onFinish={() => {
                                                this.props.writeText({ message: 'Code fragment download success!' }, () => {
                                                    let newState = { ...this.props.overallState };
                                                    newState.hasTempertureFix = true;
                                                    this.props.updateOverallState(newState, () => this.props.onBack());
                                                })
                                            }} />
                                    ])
                                })
                            })
                        }} />
                ])
            })
        })
    }

    /**
     * Sequence Functions
     */

    handleSequenceFix = (command: string, args: string[], fullText: string) => {
        this.removeCommandLine(() => {
            let numb = Number(command);
            if (command.toLowerCase() === 'help') {
                this.doSequenceFix()
            }
            else if (command.toLowerCase() === 'back') {
                this.props.onBack();
            }
            else if (!isNaN(numb)) {
                let targetNumb = this.props.overallState.hardMode ? 55 : 55;
                if (numb === targetNumb) {
                    this.doSuccessfulSequenceFix();
                }
                else {
                    this.props.writeText({ message: 'Checking...' }, () => {
                        setTimeout(() => {
                            this.props.addLine([command + " is incorrect, partition table still incomplete"], () => {
                                this.setState({ restoreState: RestoreState.SEQUENCE_PUZZLE })
                            })
                        }, 3000)

                    })
                }
            }
            else {
                this.props.addLine([command + " is not a number"], () => {
                    this.setState({ restoreState: RestoreState.SEQUENCE_PUZZLE })
                })
            }
        })
    }

    doSuccessfulSequenceFix = () => {
        this.props.clearLines(() => {
            this.props.writeText({ message: 'Repairing partition...' }, () => {
                this.props.addLine([
                    <LoadingHelper
                        startPercent={0}
                        endPercent={100}
                        message="Repairing..."
                        showPercent
                        onFinish={() => {
                            this.props.writeText({ message: 'Partition repair success!' }, () => {
                                this.props.writeText({ message: "Detecting code fragment in partition manifest, downloading now..." }, () => {
                                    this.props.addLine([
                                        <LoadingHelper
                                            startPercent={0}
                                            endPercent={100}
                                            transitionSpeed={200}
                                            message="Downloading..."
                                            showPercent
                                            onFinish={() => {
                                                this.props.writeText({ message: 'Code fragment download success!' }, () => {
                                                    let newState = { ...this.props.overallState };
                                                    newState.hasSequenceFix = true;
                                                    this.props.updateOverallState(newState, () => this.props.onBack());
                                                })
                                            }} />
                                    ])
                                })
                            })
                        }} />
                ])
            })
        })
    }

    /**
     * Letter Functions
     */

    handleLetterFix = (command: string, args: string[], fullText: string) => {
        this.removeCommandLine(() => {
            let numb = Number(command);
            if (command.toLowerCase() === 'help') {
                this.doLetterFix()
            }
            else if (command.toLowerCase() === 'back') {
                this.props.onBack();
            }
            else if (!isNaN(numb)) {
                let targetNumb = this.props.overallState.hardMode ? 5 : 3;
                if (numb === targetNumb) {
                    this.doSuccessfulLetterFix();
                }
                else {
                    this.props.writeText({ message: 'Checking...' }, () => {
                        setTimeout(() => {
                            this.props.addLine([command + " is incorrect, read frequency still incorrect"], () => {
                                this.setState({ restoreState: RestoreState.LETTER_PUZZLE })
                            })
                        }, 5000)

                    })
                }
            }
            else {
                this.props.addLine([command + " is not a number"], () => {
                    this.setState({ restoreState: RestoreState.LETTER_PUZZLE })
                })
            }
        })
    }

    doSuccessfulLetterFix = () => {
        this.removeCommandLine(() => {
            this.props.writeText({ message: 'Setting read frequency...' }, () => {
                this.props.addLine([
                    <LoadingHelper
                        startPercent={0}
                        endPercent={100}
                        message="Setting..."
                        showPercent
                        onFinish={() => {
                            this.props.writeText({ message: 'Read frequency correction success!' }, () => {
                                this.props.writeText({ message: "Correct freqency has revealed a code fragment, downloading now..." }, () => {
                                    this.props.addLine([
                                        <LoadingHelper
                                            startPercent={0}
                                            endPercent={100}
                                            transitionSpeed={200}
                                            message="Downloading..."
                                            showPercent
                                            onFinish={() => {
                                                this.props.writeText({ message: 'Code fragment download success!' }, () => {
                                                    let newState = { ...this.props.overallState };
                                                    newState.hasLetterFix = true;
                                                    this.props.updateOverallState(newState, () => this.props.onBack());
                                                })
                                            }} />
                                    ])
                                })
                            })
                        }} />
                ])
            })
        })
    }

    /**
    * Sector Scan Functions
    */


    generateSectorScanOptions = () => {
        let options: Types.OptionChoice[] = [
            {
                name: "Sector 231",
                description: "Text file: Augruy Helper.bat",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "The sequence repeats for 93 additional lines...",
                        "-----------------"
                    ])
                }
            },
            {
                name: "Sector 5531",
                description: "Text file: Admin Note",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "Note text: 'The new decrypt key will need all other code fragments. It will be a cAPiTaL crime if you can't figure it out.'",
                        "'Check the keys, and hopefully everything will make more sense'",
                        "-----------------"
                    ])

                }
            },
            {
                name: "Sector 0002",
                description: "Executable 'pineapple.sh'",
                action: () => {
                    if (this.props.overallState.hardMode) {
                        this.props.doPolymorphicAlgorithim()
                    }
                    else {
                        this.displaySectorText([
                            "-----------------",
                            "The file is corrupted, and cannot be read",
                            "-----------------"
                        ])
                    }
                }
            },
            {
                name: "Sector 9001",
                description: "Executable 'firefly.sh'",
                action: () => {
                    if (this.props.overallState.hardMode) {
                        this.props.doPolymorphicAlgorithim()
                    }
                    else {
                        this.displaySectorText([
                            "-----------------",
                            "The file is corrupted, and cannot be read",
                            "-----------------"
                        ])
                    }
                }
            },
            {
                name: "Sector 46632",
                description: "Binary file: 101101.io",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "101101001101001010110010100011001010001001000100100101010100101110010010",
                        "100101011101011010101010100011011010000001010100100101010100101000010000",
                        "101001010110101001010101010100101001010101101001010001010100111010100101",
                        "010010101101010101100100101010010010110101010100101011010101010010100100",
                        "-----------------"
                    ])
                }
            },
            {
                name: "Sector 88392",
                description: "Binary file: blackmail.io",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "The file is corrupted, and cannot be read",
                        "-----------------"
                    ])
                }
            },
            {
                name: "Sector 3002",
                description: "Executable 'mourning.sh'",
                action: () => {
                    this.displaySectorText([
                        "----------------",
                        "Alarm set for 0600 tomorrow morning",
                        "----------------"
                    ])
                }
            },
            {
                name: "Sector 2311",
                description: "Text file: exFault.bat",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X50 0XF0 0X90 0X70 0XC0 0X40 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "The sequence repeats for 98 additional lines...",
                        "-----------------"
                    ])
                }
            },
            {
                name: "Sector 33092",
                description: "Text file: 9985745.bat",
                action: () => {
                    this.displaySectorText([
                        "-----------------",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "0X50 0XF0 0X90 0X70 0XC0 0X40 0X11 0X87",
                        "0X5F 0XFF 0X94 0X77 0XCA 0X41 0X11 0X87",
                        "The sequence repeats for 98 additional lines...",
                        "-----------------"
                    ])
                }
            },
            {
                name: "Sector 0092",
                description: "Corrupted file, unknown type or name",
                action: () => {
                    if (this.props.overallState.hardMode) {
                        this.props.doPolymorphicAlgorithim()
                    }
                    else {
                        this.displaySectorText([
                            "-----------------",
                            "The file is corrupted, and cannot be read",
                            "-----------------"
                        ])
                    }

                }
            },
            {
                name: "Sector 0101",
                description: "Corrupted file, unknown type or name",
                action: () => {
                    this.removeCommandLine(() => {
                        this.props.clearLines(() => {
                            this.props.writeText({ message: "Code fragment found, now attempting to download," }, () => {
                                this.props.addLine([
                                    <LoadingHelper
                                        startPercent={0}
                                        endPercent={100}
                                        message="Downloading..."
                                        transitionSpeed={200}
                                        showPercent
                                        onFinish={() => {
                                            this.props.writeText({ message: 'Code segment repaired!' }, () => {
                                                let newState = { ...this.props.overallState };
                                                newState.hasSectorScanFix = true
                                                this.props.updateOverallState(newState, () => {
                                                    this.props.onBack();
                                                })
                                            })
                                        }} />
                                ])
                            })
                        })
                    })
                }
            },
            {
                name: "Sector 6604",
                description: "Corrupted file, unknown type or name",
                action: () => {
                    if (this.props.overallState.hardMode) {
                        this.props.doPolymorphicAlgorithim()
                    }
                    else {
                        this.displaySectorText([
                            "-----------------",
                            "The file is corrupted, and cannot be read",
                            "-----------------"
                        ])
                    }
                }
            }
        ];

        let numbArray: number[] = [];
        for (let i = 0; i < 6; i++) {
            let randomNumb = Math.floor(Math.random() * 12);
            if (randomNumb === 12) {
                randomNumb = 0;
            }
            numbArray.push(randomNumb);
        }
        let optionsArray = numbArray.map((each) => {
            return options[each];
        });
        optionsArray.push({
            name: "Search",
            description: "Do a search for other available sectors",
            action: () => {
                this.props.clearLines(() => {
                    this.doSectorFix()
                })

            }
        });
        return optionsArray;
    }

    displaySectorText = (text: string[]) => {
        this.removeCommandLine(() => {
            this.props.addLine(text, () => {
                this.setState({ restoreState: RestoreState.SECTOR_PUZZLE })
            })
        })
    }

    componentDidMount() {
        this.props.clearLines(() => {
            this.props.writeText({ message: `Starting Starfleet Intelligence Device Restore...` }, () => {
                this.props.writeText({ message: `Scanning device for potential fixes...` }, () => {
                    this.props.addLine([
                        <LoadingHelper
                            startPercent={0}
                            endPercent={100}
                            message="Searching..."
                            transitionSpeed={200}
                            showPercent
                            onFinish={() => {
                                this.props.writeText({ message: "Possible fix detected!" }, () => {

                                    if (!this.props.overallState.hasTempertureFix) {
                                        this.doTempFix()
                                    }
                                    else if (!this.props.overallState.hasSequenceFix) {
                                        this.doSequenceFix()
                                    }
                                    else if (!this.props.overallState.hasLetterFix) {
                                        this.doLetterFix()
                                    }
                                    else {
                                        this.doSectorFix()
                                    }


                                })
                            }} />
                    ])
                })
            })
        })
    }

    render() {
        return (<div>
            {this.state.restoreState === RestoreState.TEMP_PUZZLE && <TerminalInputHelper onSumbitCommand={this.handleTempFix} />}
            {this.state.restoreState === RestoreState.SEQUENCE_PUZZLE && <TerminalInputHelper onSumbitCommand={this.handleSequenceFix} />}
            {this.state.restoreState === RestoreState.LETTER_PUZZLE && <TerminalInputHelper onSumbitCommand={this.handleLetterFix} />}
            {this.state.restoreState === RestoreState.SECTOR_PUZZLE && <ConsolePicker onBackout={() => this.props.onBack()} options={this.generateSectorScanOptions()} scrollToBottom={this.props.updateScroll} />}
        </div>);
    }
}

export default ZeroDayFootballRestore;