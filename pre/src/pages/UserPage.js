import React, { Component } from 'react'
import TopBar from "../components/TopBar"
import BottomBar from "../components/BottomBar"

export default class UserPage extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <h3>UserPage</h3>
                <BottomBar />
            </div>
        )
    }
}
