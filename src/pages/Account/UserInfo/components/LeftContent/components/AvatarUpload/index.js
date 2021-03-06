import {connect} from 'dva';
import React, {Component} from 'react';
import {Upload, Icon, message} from 'antd';
import styles from './index.less'
import {imgUrl} from "../../../../../../../utils/constants";


function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}


@connect(
    ({loading, avatar, login}) => ({
        loading: loading.models.user,
        avatarUrl: avatar.avatarUrl,
        currentUser: login.currentUser,
    })
)
class AvatarUpload extends Component {

    uploadFile = (file) => {
        this.props.dispatch({
            type: "avatar/uploadAvatar",
            payload: {
                userId: this.props.currentUser.userId,
                file: file,
            }
        })
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload<br/>Your<br/>Avatar</div>
            </div>
        );

        return (
            <div className={styles['my-avatar']}>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={this.uploadFile}
                    beforeUpload={beforeUpload}
                >
                    {this.props.avatarUrl ?
                        <img src={`${imgUrl}${this.props.avatarUrl}`} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                </Upload>
            </div>
        );
    }
}

export default AvatarUpload;
