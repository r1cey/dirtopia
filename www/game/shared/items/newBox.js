import newCnt from "./newContainer.js"

// import newLive from "../newLiveObj.js"

// import { AddMsg } from "../Msgs.js"


export default( Base =newCnt() )=>class Box extends Base
{
	static boxvol	=8000	//10cm^3

	static isbox	=true

	// static Live	=newLive( LiveBox )



	gboxvol()	{return this.constructor.boxvol }


	remvol()	{return this.constructor.boxvol - this.itemvol() }


	canadditem( item ,len )
	{
		return Math.min(
			
			Math.floor( this.remvol() / item.vol() ),

			len
		)
	}


	stck2cnt( stck )
	{
		var newcnt	=stck.spawncnt()

		this.additem( newcnt )

		return { newcnt }
	}



	cnt2stck( cnt )
	{
		var skey	=cnt.gstckkey()

		if( this.inv[skey] )
		{
			++ this.inv[skey].len
		}
		else	this.inv[skey]	=cnt.newstck()
	}


	static canadditem( item ,len )
	{
		return Math.min(
			
			Math.floor( this.boxvol / item.vol() ),
			
			len
		)
	}


	canchildadditem( item ,len ,nav ,_i )
	{
		return Math.min(
			
			this.canadditem( item ,len )
			,
			nav.g(_i - 1).canchildadditem?.( item ,len ,nav ,_i - 1) || 0
		)
	}
}


///////////////////////////////////////////////////////////////////////////////



class LiveBox
{
	canchildadditem( child ,item ,len )
	{
		var{ _this ,dad }	=this

		_this.canchildadditem( child ,item ,len )

		dad.canchildadditem( )
	}
}