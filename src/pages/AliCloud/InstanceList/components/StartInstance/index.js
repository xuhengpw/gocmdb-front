import React, {Component} from "react";
import loadLocalStory from "../../../../../utils/loadLocalStory";
import {parseSearch} from "../../../../../utils/parseSearch";
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import {
    Button,
    Popconfirm,
    notification,
    Icon,
} from "antd";
import instanceStatusMap from "../../../../../../config/instanceStatus";


const openNotificationWithIcon = (msg, desc) => {
    notification.open({
        message: msg,
        description: desc,
        style: {
            width: 600,
            marginLeft: 335 - 600,
        },
        icon: <Icon type="frown" style={{color: '#a8071a'}}/>,
    });
};


@connect(
    ({aliCloud}) => ({
        defaultRegionId: aliCloud.defaultRegionId,
    })
)
@withRouter
class StartInstance extends Component {

    handleConfirm = () => {
        if (this.props.record && 'InstanceId' in this.props.record) {
            let {Status, InstanceId} = this.props.record;
            if (Status === instanceStatusMap.StatusRunning || Status === instanceStatusMap.StatusStopping || Status === instanceStatusMap.StatusPending || Status === instanceStatusMap.StatusStarting) {
                openNotificationWithIcon(
                    `can not start instance [${InstanceId}]`,
                    `instance [${Status}] can not to start`
                );
                return
            }
            this.props.dispatch({
                type: "aliCloud/startInstance",
                payload: {
                    platType: 'aliyun',
                    regionId: this.props.defaultRegionId,
                    instanceId: this.props.record.InstanceId,
                },
            })
        }
    };

    handleCancel = () => {
        // console.log('!!!!!!!!!!!!')
    };

    render() {
        return (
            <Popconfirm
                title="Are you sure start this instance?"
                onConfirm={this.handleConfirm}
                onCancel={this.handleCancel}
                okText="Yes"
                cancelText="No"
                placement="bottomRight"
            >
                <span>
                    <Icon style={{color: "#5b8c00"}} type="play-circle"/> Start
                </span>
            </Popconfirm>
        )
    }
}


export default StartInstance;
