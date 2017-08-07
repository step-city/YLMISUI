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

//注册全局组件
Vue.component('yl-panelpage', PanelPage)  
Vue.component('yl-panelzone', PanelZone) 
Vue.component('yl-toolbar', ToolBar) 
Vue.component('yl-columnlay', ColumnLay) 
Vue.component('yl-layout', Layout) 
Vue.component('yl-treeselect', TreeSelect)   
Vue.component('yl-table', Table)
Vue.component('yl-onlytable', OnlyTable)
Vue.component('yl-tableedit', tableEdit)
Vue.component('yl-selectcontainer', selectContainer)
Vue.component('yl-querycontainer', queryContainer)
Vue.component('yl-renderComs', renderComs)
Vue.component('yl-dynamicForm', dynamicForm)
Vue.component('yl-loading', loading)
Vue.component('yl-error', error)
//Vue.component('yl-jsoneditor', jsonEditor)
Vue.component('yl-mdeditor', mdEditor)
Vue.use(VueQuillEditor)
