// import Holder from "../Holder.js";
import Item	from "./Item.js"
import newInv from "./newInv.js"

// import{ IdPool }	from "../utils.js"

import{ key as itemk }	from "./Item.js"



export default( Base =newInv(Item) )=>class Cnt	extends Base
{
	id	=0

	/**@static
	@var Stack */


/*
	constructor( init )
	{
		/** the difference is only relevant between server and client machines *
		
		if( init )	this.set( init )

		else	this.id	=Cnt.idpool.new()
	}*/


	get iscnt()	{return this }

	static iscnt	=true
	

	///////////////////////////////////////////////////////////////////////////




	/*
	Cnt.prototype. delitem	=function( item, num =1, dadbox )
	{
		/** If becomes empty, make generic and merge at dad. *

		var itemn	=item.constructor.name

		item.notempty	? this.set.delete(item)	:
		
			(this.o[itemn].num	-= num) > 0	? 0	: delete this.o[itemn]

		this.calcempty()	? dadbox.set.delete(this) && Box.prototype.additem. call(dadbox, this ) : 0
	}*/


	///////////////////////////////////////////////////////////////////////////



	newstck()	{return new this.constructor.Stack() }

	
	static newStck( StckC )
	{
		var Cnt	=this

		var newkey	=this.key+StckC.suffix

		var o	={}
		
		o[newkey]	=class extends StckC
		{
			static key	=newkey

			static vol	=Cnt.vol

			static Cnt	=Cnt
		}
		return	this.Stack	=o[newkey]
	}


	gstckkey()	{return this.constructor.Stack.key }


	///////////////////////////////////////////////////////////////////////////


	/*toJSON( key )
	{
		return  /^\d+$/.test( key ) ? [ this.gkey() ,this.id ] : this
	}*/

	tonavmsg()	{return[ this.gkey() ,this.id ]}


	static fromJSON( val ,key ,...args )
	{
		if( key === itemk )
		{
			return super.fromJSON( val ,key ,...args )
		}
		else
		{
			for(var id in val )
			{
				val[id]	=super.fromJSON( val[id] ,key ,...args )
			}
			return val
		}
	}


	///////////////////////////////////////////////////////////////////////////
}