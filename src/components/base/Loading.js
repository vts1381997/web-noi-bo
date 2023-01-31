import React, { Component } from 'react';
class Loading extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div className="modal-loading" style={{display: this.props.loading ? 'block' : 'none'}}>
                <div class="loading-ring">
                    Đợi Tý
                <span></span>
                </div>
            </div>

        )
    }
}
export default Loading;