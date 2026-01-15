export class AddMsg
{
	newcnt

	pushed2loc

	newslotcnts



	constructor( msg )
	{
		Object.assign( this ,msg )
	}


	
	tonetmsg( msg )
	{
		msg.newcntid	=this.newcnt?.id

		msg.pushed2loc	=this.pushed2loc

		if( this.newslotcnts )
		{
			var ncs	=this.newslotcnts

			msg.newslotcnts	=new Array( ncs.length )

			for(var i =0 ,len =ncs.length ;i<len;++i)
			{
				msg.newslotcnts[i]	=ncs[i].id
			}
		}
	}
}