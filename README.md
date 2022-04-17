# ReduxPractice
Um repositório simples para aprender como funciona a integração entre Redux/React/TypeScript


Para a integração de um componente React à biblioteca do Redux, alguns passos devem ser seguidos:

### Criação do ReduxRepository
No diretório para o contexto do Redux, crie uma pasta com o mesmo nome do seu componente (Apenas para organização)

Crie 3 interfaces/tipos para definir as seguintes coisas:
- Propriedades/props do componente. Recomenda-se utilizar a mesma definição que o respectivo componente recebe como props
- Definição das *DispatcherActions*. Aqui são definidas as funções que serão usadas para notificar o Redux de que um novo valor será alterado em sua *store*
- Definir o "mapa de apelido" para o reducer ao ser declarado no *rootReducer*

Exemplos:
```
export interface ComponentProps {
    text: string
}

interface ComponentReducerMap {
    title: TitleProps;
}

export interface ComponentDispatcherActions {
    changeTitle: (newtitle: string) => void
}

```

Também é necessário a criação de um *enum* para declarar os tipos de ações que uma chamada de *dispatcher* irá realizar no estado da *store*
```
export enum ComponentReduxActionsType {
    SET_TITLE = "SET_TITLE"
}
```

Após a criação das interfaces, crie uma classe que extenda a classe abstrata ***ReduxRepository***. Essa classe abstrata necessita da declaração de 3 tipos genéricos, que devem ser as 3 interfaces criadas e será necessário implementar os métodos abstratos da mesma, além de que em seu construtor é necessário declarar o estado inicial a ser repassado para a classe pai através da chamada de *super*. Abaixo, um exemplo:


```
export class ComponentReduxRepository extends ReduxRepository<ComponentProps, ComponentReducerMap, ComponentDispatcherActions> {
    constructor() {
        const initialState = {
            key: "value",
            ...
        };
        
        super(initialState);

    }
    
    public static setValue(newValue: string): ReduxAction<ComponentProps> {
        const action: ReduxAction<ComponentProps> = {
            type: ComponentReduxActionType.SET_VALUE,
            payload: {
                value: newValue
            }
        };

        return action;
    }

    public mapStateToProps(incomingReduxState: ComponentReducerMap) {
        const componentProps: ComponentProps = {
            <property>: incomingReduxState["<reducerAlias>"]["<property>"],
            ...
        };
    
        return titleProps;
    }

    public mapDispatcherToProps(dispatcher: Function): ChangeTitleDispatcherActions {
        const dispatchObject = {
            functionName: function(value: string) {
                dispatcher(ComponentRedux.setValue(value));
            }

        }

        return dispatchObject;
    }
    
    public reduce(state: ChangeTitleProps, action: ReduxAction<ChangeTitleProps>): ChangeTitleProps {
        switch (action.type) {
            case ComponentReduxActionType.SET_VALUE:
                const actionResult = {
                    ...previousState, // Preserva os outros valores que não serão mudados
                    ...action["payload"]  // Sobrescreve todos os valores que serão alterados
                }
    
                return actionResult;
            default:
                return this.INITIAL_STATE;
        }
    }

}
```

Nesta classe, deverá se concentrar, através de métodos estáticos, de preferência, as funções que serão responsáveis por iniciarem o fluxo de *dispatch* do Redux. Note o método `setValue`, onde o mesmo recebe um novo valor a ser atribuído ao estado da *store* e que o mesmo retorna um objeto do tipo `ReduxAction<ComponentProps>`


### Criando a *store* de estados

Para conectar um componente e fazer com que seu estado/props sejam ouvidas da *store* do Redux, deve-se declarar o método *reduce* da sua classe de repositório no arquivo **RootReducer.ts**, mais específicamente na chamada da função ***combineReducers***, como abaixo:

```
const reduxRepository = new ComponentReduxRepository();

const rootReducer = combineReducers({
    <componentAlias>: reduxRepository.reduce,
    ...
});
```

Pode-se declarar tantos reducer quanto quiser. Recomenda-se que `<componentAlias>` seja um nome único que identifique seu componente, pois será necessário este nome para acessar os estados do componente no método da classe de repositório `mapStateToProps`

### Conectando um componente à *store* de estados

Após a criação do repositório, crie seu componente normalmente, contúdo, no `export default`, faça como a seguir:
```
const reduxRepository = new ComponentReduxRepository();

export default connect(reduxRepository.mapStateToProps, reduxRepository.mapDispatcherToProps)(Component);
```
A função ***connect*** é fornecida pelo Redux e serve para fazer com que seu componente *observe* a *store* e seja notificado quando algum valor for alterado, desta forma, é possível acessar os valores da *store* diretamente através de ***this.props["valor"]*** dentro do seu componente
