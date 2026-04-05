import V from "../game/shared/Vec.js"

import items from "../game/items/items.js"

import GridCnt from "./GridCnt.js"
import GridItem from "./GridItem.js"
import GridUI from "./GridUI.js"


const vals   =
{
    belt    :{ size :[5,2] }
    ,
    seedbag :{ size :[2,2] }
    ,
    multi   :{ size :[3,1] }
    ,
    hands   :{ size :[5,5] }
}

const clss   ={}


for(var key in vals)
{
    const it    =items[key]

    const Cls   = it ? it.iscnt ? GridCnt : GridItem : GridUI 

    clss[key]   =class extends Cls
    {
        static size   =new V( ...vals[key].size )
    }
}
for(var key in items )
{
    if( clss[key] ) continue
    
    clss[key]   =class extends GridItem
    {
        static size   =items[key].iscnt ? new V(2,1) : new V(1,1)
    }
}


export default clss