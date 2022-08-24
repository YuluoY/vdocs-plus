/**
 * @Author：雨落
 * @Dir：server/utils/aliOss
 * @Time：2022/8/19 13:42:40
 */
const OSS = require("ali-oss");
// let client = new OSS({
//     region: 'oss-cn-hangzhou',
//     accessKeyId: 'LTAI5tGDw1hSPPFvd2eGc6Vf',
//     accessKeySecret: 'ZTmRVyWXiFRzdcOvU2CfXBfVXsPYtQ',
//     bucket: 'vdocs'
// });

module.exports = class {

    constructor({region, accessKeyId, accessKeySecret, bucket}) {
        this.region = region;
        this.keyId = accessKeyId;
        this.keySecret = accessKeySecret;
        this.bucket = bucket ?? null;

        this._client = new OSS({
            region: region,
            accessKeyId: accessKeyId,
            accessKeySecret: accessKeySecret,
        })
    }


    // 查看桶列表
    async checkBuckets() {
        try {
            return await this._client.listBuckets();
        } catch (err) {
            return err
        }
    }

    // 查看文件列表
    async checkFiles(bucket, options) {
        options = options ?? {"max-keys": 5};
        this._client.useBucket(this.bucket ?? bucket);
        try {
            return await this._client.list(options);
            // {
            //     "max-keys": 5,
            //     // prefix:''  // 符合特定前缀的文件
            // }
        } catch (err) {
            return err
        }
    }

    async putImg(bucket, uploadFilepath, localFilepath) {
        this._client.useBucket(this.bucket ?? bucket)
        try {
            return await this._client.put(uploadFilepath, localFilepath, {headers: {'Content-Type': 'image/jpg'}});
        } catch (e) {
            return e;
        }
    }

    async delImg(bucket, filePathname) {
        this._client.useBucket(this.bucket ?? bucket)
        try {
            return await this._client.delete(filePathname);
        } catch (e) {
            return e;
        }
    }

    async getImg(bucket, filePathname, localPathname) {
        this._client.useBucket(this.bucket ?? bucket)
        try {
            return await this._client.get(filePathname, localPathname, {headers: {'Content-Type': 'image/jpg'}});
        } catch (e) {
            return e
        }
    }
}