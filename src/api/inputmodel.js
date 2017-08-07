

export class inputModel {
    constructor(maxResultCount=10,draw = 1,sorting="",skipCount=0,queryConditionItem=[]) {
        this.inputModel = {};
        this.inputModel.maxResultCount=maxResultCount,//总条目数
        this.inputModel.draw=draw,
        this.inputModel.sorting=sorting,
        this.inputModel.skipCount=skipCount,  //每页行数
        this.inputModel.queryConditionItem=queryConditionItem
    }
    queryConditionType(type){
        switch(type)
            {
                    case 'None':  return 'None';  break;
                    case 'EQ':  return 'EQ';  break;
                    case 'NEQ':  return 'NEQ';  break;
                    case 'GT':  return 'GT';  break;
                    case 'GTE':  return 'GTE';  break;
                    case 'LT':  return 'LT';  break;
                    case 'LTE':  return 'LTE';  break;
                    case 'LIKE':  return 'LIKE';  break;
                    case 'LIKEL':  return 'LIKEL';  break;
                    case 'LIKER':  return 'LIKER';  break;
                    case 'IN':  return 'IN';  break;
                    case 'TreeLeft':  return 'TreeLeft';  break;
            }
    }
    addqueryConditionItem(items){
            let _this=this;
            _this.inputModel.queryConditionItem=[];
            items.map(function(item,index,arr){
                var QueryConditionItem={ dataField: '', op:"EQ", dataValue:''};
                 QueryConditionItem.dataField=item.key;
                 QueryConditionItem.op=_this.queryConditionType(item.op);
                 QueryConditionItem.dataValue=item.value;
                 _this.inputModel.queryConditionItem.push(QueryConditionItem);  
              })
    }   
   
}
 
