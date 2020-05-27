import * as React from "react";

export namespace LoadingSpinner {
    export type Props = {
        outerClassName?: string
        innerClassName?: string
        onClick?: () => void
    }
}

export default class LoadingSpinner extends React.Component<LoadingSpinner.Props, {
}> {
    render() {
        return (
            <div>
                <i className="fas fa-spinner fa-spin" />
            </div>
        )
    }
}
