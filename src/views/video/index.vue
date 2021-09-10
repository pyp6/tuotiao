<template>
  <div class="customTableSortable">
    <el-table :data="tableData" border :row-key="id" align="left">
      <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  name: "jimu-tableSortable",
  data() {
    return {
      id: "id",
      tableData: [
        {
          id: 0,
          date: "2016-05-02",
          name: "二月",
          age: "一岁半",
        },
        {
          id:1,
          date: "2016-05-02",
          name: "六六",
          age: "一岁",
        },{
          id:2,
            date: '2016-05-02',
            name: '茶茶',
            age: '三个半月'
          }
      ],
      col: [
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "name",
          label: "姓名",
        },
      ],
    };
  },
  mounted() {
    // // 阻止默认行为
    //    document.body.ondrop = function (event) {
    //      event.preventDefault();
    //      event.stopPropagation();
    //    };
    this.rowDrop();
  },
  methods: {
    //行拖拽
    rowDrop() {
      const _this = this;
      const tbodyList = document.querySelectorAll(
        ".customTableSortable .el-table__body-wrapper tbody"
      );
      tbodyList.forEach((item) => {
        Sortable.create(item, {
          onEnd({ newIndex, oldIndex }) {
            console.log(newIndex,oldIndex);
            const currRow = _this.tableData.splice(oldIndex, 1)[0];
            _this.tableData.splice(newIndex, 0, currRow);
            // _this.$emit(
            //   "dragEnd",
            //   newIndex,
            //   oldIndex,
            //   currRow,
              // _this.tableData
            // );
          },
        });
      });
    },
  },
};
</script>
