import * as React from "react";

export namespace Icon {
    export type Props = {
        outerClassName?: string
        innerClassName?: string
        onClick?: () => void
    }
}

/**
 * We better to use this connector to prevent React render errors
 * because FontAwesome v5 replace <i> with <svg>
 * and it cause error when it trying to find <i>
 */
export default class Icon extends React.Component<Icon.Props, {
}> {
    render() {
        return (
            <span className={this.props.outerClassName} onClick={this.props.onClick}>
                <i className={this.props.innerClassName} />
            </span>
        )
    }
}
