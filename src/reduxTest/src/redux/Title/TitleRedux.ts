import { ReduxAction } from "../ReduxAction";
import { ReduxRepository } from "../ReduxRepository";

export interface TitleProps {
    text: string
}

interface TitleReducerMap {
    title: TitleProps;
}

interface TitleDispatcherActions {

}

export enum TitleReduxActionsTypes {
    SET_TITLE = "SET_TITLE"
}

export class TitleRedux extends ReduxRepository<TitleProps, TitleReducerMap, TitleDispatcherActions> {
    constructor() {
        const initialState = {
            text: "Título do redux"
        };
        
        super(initialState);

    }

    public static setTitle(newTitle: string): ReduxAction<TitleProps>{
        const action: ReduxAction<TitleProps> = {
            type: TitleReduxActionsTypes.SET_TITLE,
            payload: {
                text: newTitle
            }
        };

        return action;
    }

    public mapStateToProps(incomingReduxState: TitleReducerMap): TitleProps {
        const titleProps: TitleProps = {
            text: incomingReduxState["title"]["text"]
        };
    
        return titleProps;
    }
    
    public mapDispatcherToProps(dispatcher: Function): TitleDispatcherActions {
        const dispatchObject = {

        }
    
        return dispatchObject;
    }

    public reduce(previousState: TitleProps, action: ReduxAction<TitleProps>): TitleProps {
        switch (action.type) {
            case TitleReduxActionsTypes.SET_TITLE:
                const actionResult = {
                    ...previousState, // Preserves the other values in the state as it is
                    ...action["payload"]  // overwrites all the actual values that must be changed
                }
    
                return actionResult;
            default:
                return this.INITIAL_STATE;
        }

    }
    
}
