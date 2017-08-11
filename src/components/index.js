import Vue from 'vue'

//通用工具组件
import PanelPage  from   './panel/PanelPage';
import PanelZone  from   './panel/PanelZone';
import ToolBar  from   './toolbar/ToolBar';
import ColumnLay  from   './layout/ColumnLay';
import TreeSelect from './treeselect/TreeSelect';
import Layout from './layout/Layout';
import Table from './table/Table.js';
import OnlyTable from './table/OnlyTable.js';
import tableEdit from './tableedit/tableEdit'
import selectContainer from './container/selectContainer'
import queryContainer from './container/queryContainer'
import renderComs from './dynamicform/renderComs'
import dynamicForm from './dynamicform/dynamicForm'
import loading from './loading/loading'
import error from './error/Error'
//import jsonEditor from './editor/jsonEditor'
import mdEditor from './editor/mdEditor'
import VueQuillEditor from 'vue-quill-editor'

const components = [
  PanelPage,
  PanelZone,
  ToolBar,
  ColumnLay,
  TreeSelect,
  Layout,
  Table,
  OnlyTable,
  tableEdit,
  selectContainer,
  queryContainer,
  renderComs,
  dynamicForm,
  loading,
  error,
  mdEditor
];

components.map(component => {
        //注册全局组件    
    Vue.component(component.name, component);
  });
   
Vue.use(VueQuillEditor)
