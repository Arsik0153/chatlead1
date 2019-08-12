import React from 'react';

export default function onlyNotAutorize (WrappedComponent) {
    return class extends React.Component {

        render() {
            if( localStorage.getItem('token') ) {
                this.props.history.push("/");
                return <div />
            }else {
                return <WrappedComponent {...this.props}/>
            }

        }
    }
};