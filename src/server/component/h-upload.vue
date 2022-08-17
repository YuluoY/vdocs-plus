<template>
    <div class="h-upload">
        <el-upload
                class="avatar-uploader"
                :action="UPLOAD_URL + '/api/rest/upload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl || localImgUrl" :src="imgUrl || localImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
    import {BASE_URL} from "@/axios";

    export default {
        name: 'HUpload',
        props: {
            setImgUrl: Function,
            imgUrl: {type: String, default: ''},
        },
        data() {
            return {
                localImgUrl: '',
                UPLOAD_URL: ''
            };
        },
        created() {
            this.UPLOAD_URL = BASE_URL;
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.localImgUrl = URL.createObjectURL(file.raw);
                this.setImgUrl && this.setImgUrl(res.url)
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // return isJPG && isLt2M;
                return isLt2M
            }
        }
    }
</script>

<style scope>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>