import React, { Component } from "react";
import { connect } from "react-redux";
import { TitleProps, TitleRedux } from "../redux/Title/TitleRedux";


class Title extends Component<TitleProps, any> {

    render(){
        return <h1>{this.props["text"]}</h1>

    }

}

const titleRedux = new TitleRedux();

export default connect(titleRedux.mapStateToProps, titleRedux.mapDispatcherToProps)(Title);
