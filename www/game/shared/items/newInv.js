import newHold from "../newHolder.js"



export default( Base =Object )=>class Inv extends newHold( Base )
{
	inv	={}



	canadditem()	{return true }
	

	additem( item )
	{
		var key	=item.gkey()

		var invobj	=this.inv[key]

		if( item.iscnt && item.isempty() )
		{
			item	=item.newstck()
		}
		if( item.isstck )
		{
			if( invobj )	invobj.len	+= item.len

			else	this.inv[key]	=item
		}
		else
		{
			if( invobj )	invobj[item.id]	=item

			else	this.inv[key]	={ [item.id] :item }
		}
		return item
	}


	/**@ret true if had to turn to stack */

	delitem( item ,len ,nav )
	{
		var key	=item.gkey()

		var invobj	=this.inv[key]

		if( item.isstck )
		{
			invobj.len	-= len

			if( invobj.len <= 0 )	delete this.inv[key]
		}
		else
		{
			delete invobj[item.id]

			for(var id in invobj )
			{
				var isused	=true

				break
			}
			if( ! isused )	delete this.inv[key]
		}
		if( this.isempty() && nav.at(-2).cnt2stck )
		{
			nav.at(-2).cnt2stck( this ,nav ,nav.length - 2 )

			return this
		}
	}


	///////////////////////////////////////////////////////////////////////////


	fore( fn )
	{
		for(var key in this.inv )
		{
			var invo	=this.inv[key]

			if( invo.iscnt )
			{
				for(var id in invo)	fn( invo[id] )
			}
			else	fn( invo )
		}
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
		var invobj	=this.inv[key]

		var len	=0

		if( invobj )
		{
			if( invobj.isstck )	len	=invobj.len

			else	for(var cnt in invobj )	++ len
		}
		return len
	}

	

	/*msg2navo( afrom ,i ,ato )
	{
		var navo	=this.inv[afrom[i]]

		if( navo.iscnts() )
		{
			ato.push( navo.o[afrom[i+1]] )

			return 1
		}
		ato.push( navo )
	}*/
}