import * as React from "react";

export enum ButtonType {
    Default,
    Primary,
    Social
}
export namespace Button {
    export type Props = {
        type: ButtonType
        icon?: string
        onClick: () => void
    }
}

export default class Button extends React.Component<Button.Props, {
}> {
    render() {
        let typeClass;
        switch (this.props.type) {
            case ButtonType.Social:
                typeClass = "button-social";
                break;
            case ButtonType.Primary:
                typeClass = "button-primary";
                break;
        }
        return (
            <button className={`button ${typeClass}`} onClick={this.props.onClick}>
                {
                    this.props.icon &&
                    <img className="icon" src={this.props.icon} />
                }
                {this.props.children}
            </button>
        )
    }
}
