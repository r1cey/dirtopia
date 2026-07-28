import newHold from "../newHolder.js"



export default( Base =Object )=>class Inv extends newHold( Base )
{
	inv	={}



	has( item )
	{
		const key	=item.gkey()

		const invobj	=this.inv[key]
		
		if( invobj )
		{
			if( item.isstck )	return item === invobj

			else if( item.iscnt ) return invobj[item.id]

			else console.error( this ,"Inv.has(" ,item )
		}
		return false
	}



	canadditem( item )
	{
		if( ! super.canadditem( item ))	return false

		// if this is inside item
		/** @todo maybe there's a faster way to check it than
		 * just going over the entire tree of item */

		return ! item.hasdeep?.( this )
	}
	

	additem( item )
	{
		const key	=item.gkey()

		const invobj	=this.inv[key]

		if( item.iscnt && item.isempty() )
		{
			item	=item.newstck()
		}
		if( item.isstck )
		{
			if( invobj )	invobj.len	+= item.len

			else	this.inv[key]	=item
		}
		else if( item.iscnt )
		{
			if( invobj )	invobj[item.id]	=item

			else	this.inv[key]	={ [item.id] :item }
		}
		else	console.error( this ,"Inv.additem(" ,item )

		return item
	}


	/**@ret true if had to turn to stack */

	delitem( item ,len ,nav ,ismov )
	{
		const key	=item.gkey()

		const invobj	=this.inv[key]

		if( item.isstck )
		{
			if( invobj.len <= len )	delete this.inv[key]
			
			else	invobj.len	-= len
		}
		else if( item.iscnt )
		{
			delete invobj[item.id]

			for(var id in invobj )
			{
				var isused	=true

				break
			}
			if( ! isused )	delete this.inv[key]
		}
		else	console.error( this ,"Inv.delitem" ,item )

		if( this.isempty() && nav.at(-2).cnt2stck )
		{
			nav.at(-2).cnt2stck( this ,nav ,nav.length - 2 )

			return this
		}
	}


	///////////////////////////////////////////////////////////////////////////


	fore( fun )
	{
		for(var key in this.inv )
		{
			var invo	=this.inv[key]

			if( invo.isitem )	fun( invo )

			else
			{
				for(var id in invo)	fun( invo[id] )
			}	
		}
	}


	getitem( key ,id )
	{
		const invo	=this.inv[key]

		if( invo )
		{
			if( invo.isitem )	return invo

			else
			{
				if( id )	return invo[id]

				else
				{
					for( id in invo )	return invo[id]
				}
			}
		}
		// return invo ?( invo.isitem	? invo	: invo[id] ): null
	}

	gitem	=this.getitem


	
	foretp( key ,fun )
	{
		const invo	=this.inv[key]

		if( ! invo )	return

		if( invo.isitem )
		{
			fun( invo )

			return
		}
		for( var id in invo )
		{
			fun( invo[id] )
		}
	}



	hasdeep( item )
	{
		for(var key in this.inv )
		{
			var invo	=this.inv[key]

			if( invo.isstck )
			{
				if( invo === item )	return true
			}
			else
			{
				for(var id in invo )
				{
					var cnt	=invo[id]

					if( cnt === item || cnt.hasdeep( item ))	return true
				}
			}
		}
		return false
	}


	///////////////////////////////////////////////////////////////////////////



	itemvol()
	{
		var vol	=0

		var{ inv }	=this

		for(var k in inv )
		{
			var invobj	=inv[k]

			if( invobj.calcvol )	vol += invobj.calcvol()

			else
			{
				for(var id in invobj )
				{
					vol	+= invobj[id].calcvol()
				}
			}
		}
		return vol
	}



	isempty(){ for(var k in this.inv) return false; return true }

	

	glen( key )
	{
		const invobj	=this.inv[key]

		var len	=0

		if( invobj )
		{
			if( invobj.isstck )	len	=invobj.len

			else	for(var cnt in invobj )	++ len
		}
		return len
	}


	///////////////////////////////////////////////////////////////////////////
	

	pmsg2obj( path )
	{
		if( Array.isArray( path ))
		{
			var key	=path[0]

			var id	=path[1]
		}
		else	key	=path

		const invo	=this.inv[key]

		if( invo.isitem )	return invo

		else
		{
			if( ! id )	return
			
			return invo[id]
		}
	}
}