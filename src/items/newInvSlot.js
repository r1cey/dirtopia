import newISlot from "../../www/shared/items/newInvSlot.js"

export default( Base )=>class InvSlot    extends newISlot( Base )
{
    additem( item ,nav ,msg )
	{
		if( item.isstcnt )
		{
            const len   =item.len

			const newcnts   =msg.slotnewcnts	=new Array(len)
			
			for(var i =0;i<len;++i)
			{
                newcnts[i]  =item.spawncnt()

				super.additem( newcnts[i] )
			}
		}
		else    super.additem( item )
	}
}