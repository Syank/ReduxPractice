import { ReduxAction } from "../ReduxAction";
import { ReduxRepository } from "../ReduxRepository";
import { TitleRedux } from "../Title/TitleRedux";

export interface ChangeTitleProps {

}

interface ChangeTitleReducerMap {
    changeTitle: ChangeTitleProps;

}

export interface ChangeTitleDispatcherActions {
    changeTitle: (newtitle: string) => void
}

export class ChangeTitleRedux extends ReduxRepository<ChangeTitleProps, ChangeTitleReducerMap, ChangeTitleDispatcherActions> {
    constructor() {
        super({});

    }

    public mapStateToProps(incomingReduxState: ChangeTitleReducerMap) {
        return {};
    }

    public mapDispatcherToProps(dispatcher: Function): ChangeTitleDispatcherActions {
        const dispatchObject = {
            changeTitle: function(newTitle: string) {
                dispatcher(TitleRedux.setTitle(newTitle));
            }

        }

        return dispatchObject;
    }
    
    public reduce(state: ChangeTitleProps, action: ReduxAction<ChangeTitleProps>): ChangeTitleProps {
        return {};
    }

}
