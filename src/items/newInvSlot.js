import newISlot from "../../www/shared/items/newInvSlot.js"

export default( Base )=>class InvSlot    extends newISlot( Base )
{
    additem( item ,nav ,msg )
	{
		if( item.isstcnt )
		{
            const len   =item.len

			const newcntids   =msg.slotnewcntids	=new Array(len)
			
			for(var i=0;i< len ;++i)
			{
                const cnt  =item.spawncnt()

				super.additem( cnt )

				newcntids[i]  =cnt.id
			}
		}
		else    super.additem( item )
	}
}