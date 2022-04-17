import React, { Component, RefObject } from "react";
import { connect } from "react-redux";
import { ChangeTitleRedux } from "../redux/ChangeTitle/ChangeTitleRedux";


class ChangeTitle extends Component<any, any> {
    private inputReference: RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);

        this.changeTitle = this.changeTitle.bind(this);

        this.inputReference = React.createRef();

    }

    private changeTitle(){
        const inputElement = this.inputReference!.current!;

        this.props.changeTitle(inputElement.value);

    }

    render(){
        const component = (
            <div>
                <input placeholder="Novo título" ref={this.inputReference}></input>
                <button onClick={this.changeTitle}>Trocar</button>
            </div>
        );

        return component;
    }

}

const changeTitleRedux = new ChangeTitleRedux();

export default connect(changeTitleRedux.mapStateToProps, changeTitleRedux.mapDispatcherToProps)(ChangeTitle);
