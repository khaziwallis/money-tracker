import { BrowserRouter as RouteComponentProps } from "react-router-dom";
export interface IPageLoader {
    loading ?: boolean;
    title ? : string;
}

export interface ISnackBar {
	open : boolean;
	message ?: string;
	autoHideDuration ?: number;
}

export interface ICurrency {
  label: string;
  value: string;
}

export interface IAccountForm {
  name: string;
  balance: number;
  group: string;
}

export interface ICurrencyGroup {
  label: string;
  value: string;
}
export interface IRouterProps extends RouteComponentProps<any> {
  history;
}