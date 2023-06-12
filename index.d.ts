declare module 'react-native-easy-markdown' {
  type Props = {
    styles: StyleSheet;
    children: string;
    rules: Record<string, unknown>;
    whitelist: any[];
    blacklist: any[];
  };

  type DefaultProps = Props & {
    children: string;
  };

  export default class Markdown extends React.Component {
    constructor(props: Props);
    render(): JSX.Element;
  }
}
