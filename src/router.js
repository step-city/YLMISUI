import Vue from 'vue';
import Router from 'vue-router';

         const testComponent = resolve => require(['./testComponent.vue'], resolve);

      //业务组件
        const Login = resolve => require(['./pages/Login.vue'], resolve);
        const Main = resolve => require(['./pages/Main.vue'], resolve);
        const Home = resolve => require(['./pages/Home.vue'], resolve);
        const Page404 = resolve => require(['./pages/Page404.vue'], resolve);
    //业务组件    Api测试
        // const ApiTest = resolve => require(['./pages/ApiTest.vue'], resolve);
        // const ComDemo = resolve => require(['./pages/ComDemo.vue'], resolve);
    //系统管理--系统设置
        const MenuApp = resolve => require(['./pages/operation/systeminfo/menuapp/MenuApp.vue'], resolve);
        const MenuItem = resolve => require(['./pages/operation/systeminfo/menuitem/MenuItem.vue'], resolve);
        const Functions = resolve => require(['./pages/operation/systeminfo/function/Function.vue'], resolve);
        const Role = resolve => require(['./pages/operation/systeminfo/role/Role.vue'], resolve);
        const RoleApproveState = resolve => require(['./pages/operation/systeminfo/roleapprovestate/RoleApproveState.vue'], resolve);
      //系统管理--系统数据
        const DataDictionaryDetail = resolve => require(['./pages/operation/systeminfo/datadictionary/DataDictionaryDetail.vue'], resolve);
        const ProvinceCity = resolve => require(['./pages/operation/systeminfo/provincecity/ProvinceCity.vue'], resolve);
        const CodeRule = resolve => require(['./pages/operation/systeminfo/coderule/CodeRule.vue'], resolve);
      //基础管理--基础数据
        const Parameters = resolve => require(['./pages/operation/basic/parameters/Parameters.vue'], resolve);
        const Organize = resolve => require(['./pages/operation/basic/organize/Organize.vue'], resolve);
        const User = resolve => require(['./pages/operation/basic/user/User.vue'], resolve);
        const TableColConfig = resolve => require(['./pages/operation/basic/tableconfig/TableColConfig.vue'], resolve);
        const AttachMent = resolve => require(['./pages/operation/basic/attachment/AttachMent.vue'], resolve);
      //基础管理--业务数据
        const StandardGH = resolve => require(['./pages/operation/basic/standardgh/StandardGH.vue'], resolve);
        const TemplateGH = resolve => require(['./pages/operation/basic/templategh/TemplateGH.vue'], resolve);
        const GH = resolve => require(['./pages/operation/basic/gh/GH.vue'], resolve);
        const MaterialClass = resolve => require(['./pages/operation/basic/materialclass/MaterialClass.vue'], resolve);
        const Material = resolve => require(['./pages/operation/basic/material/Material.vue'], resolve);
        const CommonMaterial = resolve => require(['./pages/operation/basic/commonmaterial/CommonMaterial.vue'], resolve);
        const Supplier = resolve => require(['./pages/operation/basic/supplier/Supplier.vue'], resolve);
        const Labour = resolve => require(['./pages/operation/basic/labour/Labour.vue'], resolve);
        const CommonLabour = resolve => require(['./pages/operation/basic/commonlabour/CommonLabour.vue'], resolve);
        const CommonSupplier = resolve => require(['./pages/operation/basic/commonsupplier/CommonSupplier.vue'], resolve);
        const StorePostion = resolve => require(['./pages/operation/basic/storepostion/StorePostion.vue'], resolve);
        const Project = resolve => require(['./pages/operation/basic/project/Project.vue'], resolve);
        const CommonDataDictionary = resolve => require(['./pages/operation/basic/commondatadictionary/CommonDataDictionary.vue'], resolve);    
    //物资系统---消耗物资管理
        const singleTable = resolve => require(['./pages/config/singletable/singleTable.vue'], resolve);
        const GHInitialPlan = resolve => require(['./pages/materials/ghinitialplan/GHInitialPlan.vue'], resolve);
        const RequistionInOrder = resolve => require(['./pages/materials/requistionin/RequistionInOrder.vue'], resolve);
        const ContractOrder = resolve => require(['./pages/materials/contract/ContractOrder.vue'], resolve);
        const ReceiveOrder = resolve => require(['./pages/materials/receive/ReceiveOrder.vue'], resolve);
        const CurrentStore = resolve => require(['./pages/materials/currentstore/CurrentStore.vue'], resolve);
        const DeliveryOrder = resolve => require(['./pages/materials/delivery/DeliveryOrder.vue'], resolve);
        const AllotOrder = resolve => require(['./pages/materials/allot/AllotOrder.vue'], resolve);
        const ScrapOrder = resolve => require(['./pages/materials/scrap/ScrapOrder.vue'], resolve);
        const RequistionInCheckOrder = resolve => require(['./pages/materials/requistionincheck/RequistionInCheckOrder.vue'], resolve);
        const RequistionInNotQulifyOrder = resolve => require(['./pages/materials/requistioninnotqulify/RequistionInNotQulifyOrder.vue'], resolve);
        const AllotInOrder = resolve => require(['./pages/materials/allotin/AllotInOrder.vue'], resolve);
        const PurchasePlanOrder = resolve => require(['./pages/materials/purchaseplan/PurchasePlanOrder.vue'], resolve);
        const ChargeAgainst = resolve => require(['./pages/materials/chargeagainst/ChargeAgainst.vue'], resolve);
    //  成本分析-- 消耗物资成本分析
        const GHMonthConsumptionOrder = resolve => require(['./pages/materials/ghmonthconsumption/GHMonthConsumptionOrder.vue'], resolve);
        const LabourMonthConsumptionOrder = resolve => require(['./pages/materials/labourmonthconsumption/LabourMonthConsumptionOrder.vue'], resolve);
    //半成品管理--钢筋加工管理
        const SFProductMaterialsOrder = resolve => require(['./pages/materials/sfproductmaterials/SFProductMaterialsOrder.vue'], resolve);
        const OriginalMaterialReceiveOrder = resolve => require(['./pages/materials/originalmaterialreceive/OriginalMaterialReceiveOrder.vue'], resolve);
        const SFProductRegistrationOrder = resolve => require(['./pages/materials/sfproductregistration/SFProductRegistrationOrder.vue'], resolve);
        const SFProductDeliveryOrder = resolve => require(['./pages/materials/sfproductdelivery/SFProductDeliveryOrder.vue'], resolve);
        const OriginalMaterialCheck = resolve => require(['./pages/materials/originalmaterialcheck/OriginalMaterialCheck.vue'], resolve);
        const SFProductCheck = resolve => require(['./pages/materials/sfproductcheck/SFProductCheck.vue'], resolve);
        const SFProductScrap = resolve => require(['./pages/materials/sfproductscrap/SFProductScrap.vue'], resolve);
        const SFProductInventory = resolve => require(['./pages/materials/sfproductinventory/SFProductInventory.vue'], resolve);
    //半成品管理--混凝土管理      
        const LopItem = resolve => require(['./pages/materials/lopitem/LopItem.vue'], resolve);
        const WeightItem = resolve => require(['./pages/materials/weightitem/WeightItem.vue'], resolve);
        const ConcreteAnalyze = resolve => require(['./pages/materials/concreteanalyze/ConcreteAnalyze.vue'], resolve);
        const MaterialAnalyze = resolve => require(['./pages/materials/materialanalyze/MaterialAnalyze.vue'], resolve);
        const StoreCheckOrder = resolve => require(['./pages/materials/storecheck/StoreCheckOrder.vue'], resolve);
        const ConcreteDeliveryOrder = resolve => require(['./pages/materials/concretedelivery/ConcreteDeliveryOrder.vue'], resolve);
    //周转材料管理--摊销管理
        const TurnoverReceiveOrder = resolve => require(['./pages/materials/turnoverreceive/TurnoverReceiveOrder.vue'], resolve);
        const TurnoverAllotInOrder = resolve => require(['./pages/materials/turnoverallotIn/TurnoverAllotInOrder.vue'], resolve);
        const TurnoverAmortizeRuleOrder = resolve => require(['./pages/materials/turnoveramortizerule/TurnoverAmortizeRuleOrder.vue'], resolve);
        const TurnoverAmortizeOrder = resolve => require(['./pages/materials/turnoveramortize/TurnoverAmortizeOrder.vue'], resolve);
        const TurnoverScrapOrder = resolve => require(['./pages/materials/turnoverscrap/TurnoverScrapOrder.vue'], resolve);
        const TurnoverAllotOrder = resolve => require(['./pages/materials/turnoverallot/TurnoverAllotOrder.vue'], resolve);
        const TurnoverSellOrder = resolve => require(['./pages/materials/turnoversell/TurnoverSellOrder.vue'], resolve);
        const TurnoverInventory = resolve => require(['./pages/materials/turnoverinventory/TurnoverInventory.vue'], resolve);
Vue.use(Router);
export default new Router({
routes:[
   {path: '/Login', component: Login },
   {
    path: '/',
    component: Main,
    redirect: '/home',
    name: '',
    children: [
      { path: 'home', component: Home, name: '首页'  },
    ]
  },
  {
    path: '/pages',
    component: Main,
    name: '系统管理',
    children: [
      //系统管理--系统设置
        { path: 'menuApp', component: MenuApp, name: '应用系统' },
        { path: 'menuItem', component: MenuItem, name: '菜单管理' },
        { path: 'function', component: Functions, name: '功能管理' },
        { path: 'role', component: Role, name: '角色管理' },
        { path: 'roleapprovestate', component: RoleApproveState, name: '审批管理' },
    //系统管理--系统数据
        { path: 'datadictionarydetail', component: DataDictionaryDetail, name: '数据字典' },
        { path: 'provinceCity', component: ProvinceCity, name: '省市管理' },
        { path: 'coderule', component: CodeRule, name: '编码管理' },
    //基础管理--基础数据
        { path: 'organize', component: Organize, name: '组织机构管理' },
        { path: 'user', component: User, name: '用户管理' },
        { path: 'attachment', component: AttachMent, name: '附件管理' },
        { path: 'parameters', component: Parameters, name: '组织属性' },
        { path: 'tablecolconfig', component: TableColConfig, name: '表信息配置' },
    //基础管理--业务数据
        { path: 'standardgh', component: StandardGH, name: '工号标准库' },
        { path: 'templategh', component: TemplateGH, name: '工号模板' },
        { path: 'gh', component: GH, name: '工号管理' },
        { path: 'materialclass', component: MaterialClass, name: '材料类别' },
        { path: 'material', component: Material, name: '材料信息' },
        { path: 'commonmaterial', component: CommonMaterial, name: '常用材料' },
        { path: 'supplier', component: Supplier, name: '供应商管理' },
        { path: 'labour', component: Labour, name: '用料单位管理' },
        { path: 'commonlabour', component: CommonLabour, name: '常用用料单位' },
        { path: 'commonsupplier', component: CommonSupplier, name: '常用供应商' },
        { path: 'storepostion', component: StorePostion, name: '存放地管理' },
        { path: 'project', component: Project, name: '项目信息维护' },
        { path: 'commondatadictionary', component: CommonDataDictionary, name: '项目部数据字典' },
    //业务组件    Api测试
        // { path: 'comdemo', component: ComDemo, name: '测试页面' },
        // { path: 'apitest', component: ApiTest,name: 'api测试页面'  },

        { path: 'apitest', component: testComponent,name: '测试页面'  },
        {path: '*',component: Page404} 
          ]
        },
      {
      path: '/materials',
      component: Main,
      name: '物资管理',
      children: [
       //消耗物资管理
        { path: 'singletable/:tableName', component: singleTable, name: '单页面配置'  },
        { path: 'ghinitialplan', component: GHInitialPlan, name: '工号总需用计划'  },
        { path: 'purchaseplan', component: PurchasePlanOrder, name: '采购计划'  },
        { path: 'contract', component: ContractOrder, name: '采购合同'  },
        { path: 'requistionin', component: RequistionInOrder, name: '进料登记'  },
        { path: 'requistionincheck', component: RequistionInCheckOrder, name: '送检登记'  },
        { path: 'requistioninnotqulify', component: RequistionInNotQulifyOrder, name: '不合格登记'},
        { path: 'receive/:type', component: ReceiveOrder, name: '点收单'  },
        { path: 'current', component: CurrentStore, name: '库存管理'  },
        { path: 'delivery/:type', component: DeliveryOrder, name: '发料单'  },
        { path: 'scrap', component: ScrapOrder, name: '报废单'  },
        { path: 'allot/:type', component: AllotOrder, name: '调拨单'  },
        { path: 'allotin', component: AllotInOrder, name: '调入单'  },
    //周转材料管理--摊销管理
        { path: 'turnoverreceive', component: TurnoverReceiveOrder, name: '周转收料单'  },
        { path: 'turnoverallotIn', component: TurnoverAllotInOrder, name: '周转调入单'  },
        { path: 'turnoveramortizerule', component: TurnoverAmortizeRuleOrder, name: '摊销规则'  },
        { path: 'turnoveramortize', component: TurnoverAmortizeOrder, name: '摊销单'  },
        { path: 'turnoverallot', component: TurnoverAllotOrder, name: '调出单'  },
        { path: 'turnoverscrap', component: TurnoverScrapOrder, name: '周转材料报废单'  },
        { path: 'turnoversell', component: TurnoverSellOrder, name: '让售单'  },
        { path: 'turnoverinventory', component: TurnoverInventory, name: '周转材料库存'  },
    //半成品管理--钢筋加工管理
        { path: 'sfproductmaterials', component: SFProductMaterialsOrder, name: '半成品材料库'  },
        { path: 'originalmaterialreceive', component: OriginalMaterialReceiveOrder, name: '原材料收料单'  },
        { path: 'sfproductregistration', component: SFProductRegistrationOrder, name: '半成品登记'  },
        { path: 'sfproductdelivery', component: SFProductDeliveryOrder, name: '半成品发料单'  },
        { path: 'originalmaterialcheck', component: OriginalMaterialCheck, name: '原材料盘点单'  },
        { path: 'sfproductcheck', component: SFProductCheck, name: '半成品盘点单'  },
        { path: 'sfproductscrap', component: SFProductScrap, name: '废料单'  },
        { path: 'sfproductinventory', component: SFProductInventory, name: '半成品库存'  },
    //半成品管理--混凝土管理
        { path: 'lopitem', component: LopItem, name: '机楼生产数据'  },
        { path: 'weightitem', component: WeightItem, name: '收料数据'  },
        { path: 'materialanalyze', component: MaterialAnalyze, name: '原材料节超分析'  },
        { path: 'concreteanalyze', component: ConcreteAnalyze, name: '混凝土节超分析'  },
        { path: 'storecheck', component: StoreCheckOrder, name: '混凝土出料数据'  },  
        { path: 'concretedelivery', component: ConcreteDeliveryOrder, name: '原材料盘点'  },
    //成本分析-- 消耗物资成本分析
        { path: 'ghmonthconsumption', component: GHMonthConsumptionOrder, name: '工号月应耗量'  }, 
        { path: 'labourmonthconsumption', component: LabourMonthConsumptionOrder, name: '用料单位月应耗量'  },

     {path: '*',component: Page404} 
    ] 
  },
      {path: '*',component: Page404} 
  ]
});