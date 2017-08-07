
function nodeStyle(node){
            if(node.isLeaf){
                return 'icon-file-empty';
                }
            else{
                if(node.expanded){
                    return 'icon-folder-open';
                    }
                else{
                    return 'icon-folder';
                    }
            }
            
        }
export default {
 props:{
        nodeStateConf:{
                        required: false,
                        type: Array,
                        default: function () {
                            return []
                        }
            }
    },
  methods: {
       renderContent(h, { node, data, store }) {
            return (
                <span class="yl-tree-style"> 
                    <span class="yl-node-style">  
                        <i class={nodeStyle(node)}></i>
                    </span>
                    {
                           this.nodeStateConf.map(item=>{
                            return ( <span class="yl-node-mark" class={data[item.name]&&item.tagflag?'':'yl-hidden'}>  
                                        <el-tag type={item.style} hit >{item.text}</el-tag>
                                    </span>
                                    )
                                
                           }) 
                    }
                    <span>
                        {node.label}
                    </span>
                </span>
                );
        },
  }
};
