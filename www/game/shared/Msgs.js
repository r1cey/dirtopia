export class AddMsg
{
	newcnt

	pushed2loc

	slotnewcnts



	constructor( msg )
	{
		Object.assign( this ,msg )
	}


	tonetmsg( msg )
	{
		msg.newcntid	=this.newcnt?.id

		msg.pushed2loc	=this.pushed2loc

		if( this.slotnewcnts )
		{
			var ncs	=this.slotnewcnts

			msg.slotnewcnts	=new Array( ncs.length )

			for(var i =0 ,len =ncs.length ;i<len;++i)
			{
				msg.slotnewcnts[i]	=ncs[i].id
			}
		}
	}
}