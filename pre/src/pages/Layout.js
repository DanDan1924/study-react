import React, { Component } from 'react'
import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"

export default class Layout extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <h3>Layout</h3>
                <BottomBar />
            </div>
        )
    }
}
