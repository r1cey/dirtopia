import V from "../../shared/Vec.js"

import itTps from "../../items/itemTypes.js"

import GridCnt from "./GridHolder.js"
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

const tps   ={}

 
for(var key in vals)
{
    const It    =itTps[key]

    const Type   = It ?( It.iscnt ? GridCnt : GridItem ):
    
        key==="hands" ? GridHands : GridUI ;

    if( Type === GridUI )   console.warn( "No grid type for item type: "+key )

    tps[key]   =class extends Type
    {
        static size   =new V( ...vals[key].size )
    }
}
for(var key in itTps )
{
    if( tps[key] ) continue
    
    tps[key]   =class extends GridItem
    {
        static size   =itTps[key].iscnt ? new V(2,1) : new V(1,1)
    }
}


export default tps