<template>
    <div class="write">
        <div>
            <div>
                <label>
                    <span>标题：</span>
                    <input type="text"/>
                </label>
            </div>
            <div>
                <label>
                    <span>类别：</span>
                    <input type="text" multiple/>
                </label>
            </div>
            <div>
                <label>
                    <span>作者：</span>
                    <input type="text"/>
                </label>
            </div>
            <div>
                <input type="file"/>
            </div>
            <v-md-editor v-model="str"
                         @save="handleSave"
                         @upload-image="handleUploadImage"
                         :include-level="[1,2,3]"
                         height="400px"></v-md-editor>
            <div style="text-align: center; margin-top: 2em;">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Write",
        data() {
            return {
                str: '',
            }
        },
        methods:{
            handleUploadImage(event, insertImage, files){

            },
            handleSave(text, html){
                console.log(text)
            }

        }
    }
</script>

<style scoped>

</style>