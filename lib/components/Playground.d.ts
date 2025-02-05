import * as React from 'react';
import GraphQLEditor from './Playground/GraphQLEditor';
import { ISettings } from '../types';
import { GraphQLConfig } from '../graphqlConfig';
import { ApolloLink } from 'apollo-link';
import { GraphQLSchema } from 'graphql';
import { Session } from '../state/sessions/reducers';
export interface Response {
    resultID: string;
    date: string;
    time: Date;
}
export interface Props {
    endpoint: string;
    sessionEndpoint: string;
    subscriptionEndpoint?: string;
    projectId?: string;
    shareEnabled?: boolean;
    adminAuthToken?: string;
    onSuccess?: (graphQLParams: any, response: any) => void;
    isEndpoint?: boolean;
    isApp?: boolean;
    onChangeEndpoint?: (endpoint: string) => void;
    share: (state: any) => void;
    shareUrl?: string;
    onChangeSubscriptionsEndpoint?: (endpoint: string) => void;
    getRef?: (ref: Playground) => void;
    graphqlConfig?: any;
    onSaveSettings: () => void;
    onChangeSettings: (settingsString: string) => void;
    onSaveConfig: () => void;
    onChangeConfig: (configString: string) => void;
    onUpdateSessionCount?: () => void;
    config: GraphQLConfig;
    configString: string;
    configIsYaml: boolean;
    canSaveConfig: boolean;
    fixedEndpoints: boolean;
    headers?: any;
    configPath?: string;
    createApolloLink?: (session: Session) => ApolloLink;
    workspaceName?: string;
    schema?: GraphQLSchema;
}
export interface ReduxProps {
    selectTabIndex: (index: number) => void;
    selectNextTab: () => void;
    selectPrevTab: () => void;
    closeSelectedTab: () => void;
    newSession: (endpoint: string, reuseHeaders: boolean) => void;
    initState: (workspaceId: string, endpoint: string) => void;
    saveConfig: () => void;
    saveSettings: () => void;
    setTracingSupported: (value: boolean) => void;
    injectHeaders: (headers: string, endpoint: string) => void;
    setConfigString: (str: string) => void;
    schemaFetchingError: (endpoint: string, error: string) => void;
    schemaFetchingSuccess: (endpoint: string, tracingSupported: boolean) => void;
    isReloadingSchema: boolean;
    isConfigTab: boolean;
    isSettingsTab: boolean;
    isFile: boolean;
    historyOpen: boolean;
    file: string;
    sessionHeaders?: any;
    settings: ISettings;
    settingsString: string;
}
export interface State {
    schema?: GraphQLSchema;
}
export interface CursorPosition {
    line: number;
    ch: number;
}
export { GraphQLEditor };
export declare class Playground extends React.PureComponent<Props & ReduxProps, State> {
    static defaultProps: {
        shareEnabled: boolean;
    };
    apolloLinks: {
        [sessionId: string]: any;
    };
    observers: {
        [sessionId: string]: any;
    };
    graphiqlComponents: any[];
    getSchema: any;
    private backoff;
    private initialIndex;
    private mounted;
    constructor(props: Props & ReduxProps);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props & ReduxProps): void;
    schemaGetter(propsInput?: Props & ReduxProps): Promise<void>;
    render(): JSX.Element;
    renderHistoryPopup(): JSX.Element;
    setRef: (index: number, ref: any) => void;
    closeTab: () => void;
    nextTab: () => void;
    prevTab: () => void;
    switchTab: (index: number) => void;
    handleSaveConfig: () => void;
    handleSaveSettings: () => void;
    private createSession;
    readonly httpApiPrefix: string;
}
declare const _default: any;
export default _default;
