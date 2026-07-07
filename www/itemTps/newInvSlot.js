// import Cnt from "./Cnt.js"

import newISlot from "../shared/itemTps/newInvSlot.js"


export default( Base =newISlot() )=>class InvSlot    extends Base
{
    additem( item ,nav ,newcnt ,pushed2loc ,slotnewcnts )
	{
		if( slotnewcnts )
		{
			for(var id of slotnewcnts )
            {
				var cnt	=item.spawncnt()

                cnt.id  =id

                super.additem( cnt )
            }
		}
		else	super.additem( item )
	}
}