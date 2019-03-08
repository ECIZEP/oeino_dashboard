<template>
    <div class="category_wrapper">
        <h2>分类管理</h2>
        <mu-paper :zDepth="2" class="paper_panel">
            <mu-raised-button label="添加分类" @click="categoryAction(0)" labelPosition="after">
                <span class="icon-plus-circle icon_raised_button mu-icon"></span>
            </mu-raised-button>
            <mu-table multiSelectable enableSelectAll ref="table">
                <mu-thead>
                    <mu-tr>
                        <mu-th>ID</mu-th>
                        <mu-th>分类名称</mu-th>
                        <mu-th>操作</mu-th>
                    </mu-tr>
                </mu-thead>
                <mu-tbody>
                    <mu-tr v-for="item in categoryList" :key="item.id">
                        <mu-td>{{item.id}}</mu-td>
                        <mu-td>{{item.categoryName}}</mu-td>
                        <mu-td class="categoty_actions">
                            <mu-icon-button @click.stop="categoryAction(1, item.id, item.categoryName)" class="table_button">
                                <span class="icon-edit"></span>
                            </mu-icon-button>
                            <mu-icon-button @click.stop="deleteCategory(item.id, item.categoryName)" class="table_button">
                                <span class="icon-trash-o"></span>
                            </mu-icon-button>
                        </mu-td>
                    </mu-tr>
                </mu-tbody>
            </mu-table>
        </mu-paper>
        <mu-dialog :open="dialog.show" :title="dialog.title">
            <div class="dialog_content">
                <mu-text-field label="分类名称" v-model="dialog.categoryName" :label-float="true" :full-width="true" :max-length="15"  hintText="不超过10个字符" error-text=""/>
            </div>
            <mu-flat-button slot="actions" @click="dialog.show = false" primary label="取消"/>
            <mu-flat-button slot="actions" @click="dialogConfirm" primary label="确定"/>
        </mu-dialog>
    </div>
</template>
<script>
    import {
        getCategory,
        addCategory,
        updateCategory,
        deleteCategory
    } from '../../graphql/category.js';

    export default {
        data() {
            return {
                dialog: {
                    // 0: 新增  1. 修改, 2. 删除
                    type: 0,
                    show: false,
                    title: '添加文章分类',
                    categoryName: '',
                    categoryId: ''
                },
                categoryList: []
            }
        },
        created() {
            getCategory().then(({ data }) => {
                this.categoryList = JSON.parse(JSON.stringify(data.getCategory));
            })
        },
        methods: {
            dialogConfirm () {
                if (this.dialog.type === 0) {
                    addCategory(this.dialog.categoryName).then(({ data }) => {
                        this.categoryList.push(data.createCategory);
                        this.dialog.categoryName = '';
                    })
                } else if (this.dialog.type === 1) {
                    updateCategory(this.dialog.categoryId, this.dialog.categoryName).then(({ data }) => {
                        if (data.updateCategory) {
                            for (let item of this.categoryList) {
                                if (item.id === this.dialog.categoryId) {
                                    item.categoryName = this.dialog.categoryName;
                                    break;
                                }
                            }
                            this.$toast({
                                message: '修改成功'
                            })
                            this.dialog.categoryName = '';
                        }
                    })
                }
                this.dialog.show = false;
            },
            deleteCategory (categoryId, categoryName) {
                this.$confirm({
                    content: '你确定要删除 ' + categoryName + ' 分类吗',
                    confirm: () => {
                        deleteCategory(categoryId).then(({ data }) => {
                            if (data.deleteCategory) {
                                this.categoryList.forEach((item, index) => {
                                    if (item.id === categoryId) {
                                        this.categoryList.splice(index, 1);
                                    }
                                })
                                this.$toast({
                                    message: '删除分类成功'
                                });
                            } else {
                                this.$toast({
                                    message: '当前分类下还有文章，不允许直接删除分类'
                                })
                            }
                        })
                    }
               })
            },
            categoryAction (type, categoryId, categoryName, item) {
                this.dialog.categoryId = categoryId || '';
                this.dialog.categoryName = categoryName || '';
                this.dialog.show = true;
                switch(type) {
                    case 0: 
                        this.dialog.title = '添加文章分类';
                        this.dialog.type = 0;
                        break;
                    case 1:
                        this.dialog.title = '修改分类名称';
                        this.dialog.type = 1;
                        break;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .category_wrapper {
        h2 {
            font-size: 24px;
            margin-bottom: 30px;
        }
        .paper_panel {
            padding: 30px;
            .categoty_actions {
                font-size: 0;
                .table_button {
                    font-size: 20px;
                }
            }
        }
    }
</style>
