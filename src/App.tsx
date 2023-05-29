import React, {Component} from "react"
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import {Routes, Route, useLocation} from 'react-router-dom'
import { ReactCountDownTimer } from "./components/Timer/Timer";

interface IStartProps {
    startTime: boolean;
}

export default class App extends Component {
    constructor(props: IStartProps) {
        super(props);
        this.state = {
            startTime: false
        }
    }

    render() {
        return (
            <div>
                < ReactCountDownTimer
                    startTimer={true}
                    countDown={1}
                    resetBtnText={'RESTART'}
                    reset={true}
                    TriesCount={2}
                    limitResetTries={false}
                    resetTimerCallback={() => { }}  
                />
            </div>
        )
    }
}
