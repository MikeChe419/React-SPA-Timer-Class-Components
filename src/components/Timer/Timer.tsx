import React from "react";
import styles from './timer.module.css'

export interface TimerProps {
    startTimer: boolean;
    countDown: number;
    reset?: boolean;
    TriesCount?: number;
    limitResetTries?: boolean;
    resetBtnText?: any;
    resetTimerCallback?:(...args: any[]) => void;
}

interface TimerState {
    startTimer: boolean;
    seconds: number;
    minutes: number;
    resend: boolean
    resendTriesCount: number;
}

export class ReactCountDownTimer extends React.Component<TimerProps, TimerState> {
    interval: any;
    seconds: number = 59;
    counter: number = 3;
    constructor(props: TimerProps) {
        super(props);

        this.state = {
            startTimer: this.props.startTimer,
            seconds: this.seconds,
            minutes: this.props.countDown === 1 ? 0 : this.props.countDown - 1,
            resend: false,
            resendTriesCount: this.props.TriesCount ? this.props.TriesCount : 0
        };
    }

    componentDidMount() {
        if(this.props.startTimer) {
            this.countDown();
        }
    }

    private countDown() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                let seconds: number;
                let minutes: number = prevState.minutes;
                if(prevState.seconds === 0) {
                    seconds = this.seconds;
                    minutes = prevState.minutes > 0 ? prevState.minutes -1 : prevState.minutes;
                    return { seconds, minutes };
                }
                seconds = prevState.seconds - 1;
                return { seconds, minutes }
            });

            //stop interval on minutes =0 and seconds =0
            if(this.state.minutes === 0 && this.state.seconds === 0) {
                if(this.props.reset) {
                    if (this.props.limitResetTries) {
                        if(this.state.resendTriesCount !== 0) 
                            this.setState({resend: true});
                        else
                            this.setState({resend: false});
                    } else
                        this.setState({resend: true});
                } 
                else {
                    this.setState({resend: false});
                }
                clearInterval(this.interval)
            }
        }, 1000);
    }

    private resetTimerEvent() {
        if(this.props.limitResetTries && this.props.limitResetTries === true) {
            this.setState(prevState => {
                let tries =  prevState.resendTriesCount > 0 ? prevState.resendTriesCount - 1 : 0;

                return {
                    resend: false,
                    minutes: this.props.countDown === 1 ? 0 : this.props.countDown - 1
                }
            });
        } else {
            this.setState({resend: false, minutes: this.props.countDown === 1 ? 0 : this.props.countDown - 1, seconds: this.seconds });
        }

        this.props.resetTimerCallback && this.props.resetTimerCallback();
        this.countDown();
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className={styles['r-countdown-wrapper']}>
              <div className={styles['r-timer-container']}>
                <div className="timer">{`${this.state.minutes <= 9 ? "0" + this.state.minutes : this.state.minutes} : ${this.state.seconds <= 9 ? "0" + this.state.seconds : this.state.seconds}`}</div>
              </div>
              <div className="restart-timer-container">
                {
                  this.state.resend &&
                  <button
                    className={styles['restart-timer-btn']}
                    onClick={() => this.resetTimerEvent()}
                  >{this.props.resetBtnText ? this.props.resetBtnText : 'RESEND'}
                  </button>
                }
              </div>
            </div>
          ) 
    }
}