import { ReduxAction } from "./ReduxAction";

export abstract class ReduxRepository<ComponentPropsType, ComponentReducerMap, ComponentDispatcherActions> {
    protected readonly INITIAL_STATE: ComponentPropsType;

    protected constructor(initialState: ComponentPropsType) {
        this.INITIAL_STATE = initialState;

        this.reduce = this.reduce.bind(this);
        this.mapStateToProps = this.mapStateToProps.bind(this);
        this.mapDispatcherToProps = this.mapDispatcherToProps.bind(this);

    }

    public abstract mapStateToProps(incomingReduxState: ComponentReducerMap): ComponentPropsType;
    public abstract mapDispatcherToProps(dispatcher: Function): ComponentDispatcherActions;

    public abstract reduce(state: ComponentPropsType, action: ReduxAction<ComponentPropsType>): ComponentPropsType;

}
